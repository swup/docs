# Swup Custom Payload Plugin



Add support for sending custom payloads to swup-powered sites. This allows
sending only the actually updated content as JSON, reducing the payload size and
speeding up page load.

To identify a request requiring a custom payload, check if the
`X-Requested-With` header is set to `swup`.

## Installation

Install the plugin from npm and import it into your bundle.

```bash
npm install @swup/custom-payload-plugin
```

```js
import SwupCustomPayloadPlugin from '@swup/custom-payload-plugin';
```

Or include the minified production file from a CDN:

```html
<script src="https://unpkg.com/@swup/custom-payload-plugin@1"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

Pass in a `generatePageObject` function that receives a server request object,
parses its response data and and returns an object with page data expected by
swup. See below for the required structure and usage examples.

```javascript
const swup = new Swup({
  plugins: [
    new SwupCustomPayloadPlugin({
        generatePageObject: (request) => {
            /* [parse data from response here] */
            return { title, blocks, pageClass, originalContent };
        }
    })
    ]
});
```

## Payload → Page object

The returned page object must include the new page's title and all its content
blocks. Other properties might be required to ensure proper functioning of
additional plugins in use by the site.

|     Property      |  Required?   |         Type          |                                             Content                                             |             Notes             |
| ----------------- | ------------ | --------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------- |
| **`title`**       | **required** | string                | Title of the new page                                                                           |                               |
| **`blocks`**      | **required** | array of HTML strings | Containers of the new page, in the correct order (as marked by `[data-swup]` attributes in DOM) |                               |
| `pageClass`       |              | string                | Class name(s) of the new page's body tag                                                        | Required by Body Class Plugin |
| `originalContent` |              | string                | Full HTML response of the new page                                                              | Required by Head Plugin       |

## Example

This example shows how to parse a JSON response from the server and return the
correct data expected by swup.

Given this custom JSON payload:

```json
{
    "title": "About",
    "template": "about",
    "containers": [
        "<main id=\"content\" class=\"transition-fade\"><h1>About</h1><p>Lorem ipsum dolor sit amet</p></main>",
        "<nav id=\"menu\" class=\"transition-fade\"><a href=\"/\">Home</a><a href=\"/about/\">About</a></nav>"
    ]
}
```

This function will parse and prepare the page data for swup:

```js
function generatePageObject({ response }) {
    const { title, template, containers } = JSON.parse(response);
    return {
        title: title,
        blocks: containers,
        pageClass: template
    };
}
```
