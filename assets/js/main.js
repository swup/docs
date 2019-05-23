var swup = new Swup({
  containers: ['#nav', '#swup'],
  plugins: [
    new SwupDebugPlugin(),
    new SwupScrollPlugin({
      animateScroll: false
    }),
    new SwupSlideTheme(),
    new SwupBodyClassPlugin(),
    new SwupGaPlugin(),
  ],
});
