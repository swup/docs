/**
 * WebPack Config to be used with classic backend servers (e.g. WordPress, ...)
 * Copyright: Rasso Hilbr <mail@rassohilber.com>
 * License: ISC
 *
 * Features:
 *    – Transpilation of JS(+TypeScript) and SCSS
 *    – Support for dynamic imports [e.g. await import(...)]
 *    – Handling of assets (Fonts, Images)
 *    – HTTPS support
 *    – Support for css autoprefixer and logical properties
 *    – Debugging over local network (BrowserSync Proxy)
 *    – Live reloading with automatic snippet injection
 *    - Optionally watches extra files and reloads the browser if they change
 *
 * Usage: See "scripts" in package.json
 *
 */

/**
 * Imports
 */
import path from "path";
import { fileURLToPath } from "url";
import RemoveEmptyScriptsPlugin from "webpack-remove-empty-scripts";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import LiveReloadPlugin from "webpack-livereload-plugin";
import CopyPlugin from "copy-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import * as dotenv from "dotenv";
import { ESBuildMinifyPlugin } from "esbuild-loader";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";
import browserslist from "browserslist";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import findup from "findup-sync";
dotenv.config({ path: findup(".env") });

/**
 * Settings
 */
const settings = {
  entryPoints: {
    main: ["./src/_assets/js/main.js"],
    "just-the-docs": "./src/_assets/js/just-the-docs.js",
  },
  outputPath: "./_site/assets",
  /**
   * Switched from `es2017` to browserslist:
   * @see https://github.com/nihalgonsalves/esbuild-plugin-browserslist
   */
  target: resolveToEsbuildTarget(browserslist(), {
    printUnknownTargets: false,
  }), // Alpine.js requires at least es2017
};

/**
 * Live Reloading
 */
const initLiveReloadPlugin = () => {
  const options = {
    useSourceHash: true,
    appendScriptTag: true,
  };
  return new LiveReloadPlugin(options);
};


/**
 * Setup the config
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {
  entry: settings.entryPoints,
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, settings.outputPath),
    clean: true,
    filename: "[name].js",
    assetModuleFilename: "[name].[ext][query]",
    chunkFilename: "[name].chunk.js?v=[contenthash]",
  },
  module: {
    parser: {
      javascript: {
        importMeta: false,
      },
    },
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: "esbuild-loader",
        // exclude: /(node_modules)/,
        options: {
          loader: "ts",
          target: settings.target,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /.(ttf|otf|eot|woff(2)?)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\/static\//,
        type: "asset/resource",
        generator: {
          filename: "static/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    },
    alias: {
      '~': path.resolve(__dirname, 'assets-src/'),
    },
  },
  optimization: {
    usedExports: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: settings.target,
      }),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/_assets/images", to: "images" },
      ],
    }),
    // new FaviconsWebpackPlugin({
    //   logo: "./assets-src/static/favicon.png",
    //   prefix: "static/",
    //   mode: "webapp",
    //   favicons: {
    //     appName: process.env.NAME,
    //     appShortName: process.env.SHORT_NAME,
    //     appDescription: null,
    //     start_url: "/",
    //     display: "standalone",
    //     lang: null,
    //     background: "#fff",
    //     theme_color: "#000",
    //     icons: {
    //       yandex: false,
    //       windows: false,
    //       appleStartup: false,
    //     },
    //   },
    // }),
  ],
};

/**
 * Adjust the config depending on the --mode
 * @see https://webpack.js.org/configuration/mode/
 * @param {object} env  set via --env flag
 * @param {object} argv
 * @returns
 */
export default (env, argv) => {
  config.mode = argv.mode;

  if (argv.mode === "development") {
    config.devtool = "cheap-source-map";
    config.plugins.push(initLiveReloadPlugin());
  }

  return config;
};
