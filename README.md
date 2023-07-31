[![Build](https://github.com/Penzle/Penzle.Visual-Editor/actions/workflows/release.yaml/badge.svg)](https://github.com/Penzle/Penzle.Delivery.SDK.JS/actions/workflows/release.yaml)
[![Discord](https://img.shields.io/discord/991274367197663242?label=Discord&logo=Discord&logoColor=white)](https://discord.gg/2aK8pF6WK2)

# Penzle Visual Editor  

Penzle Visual Editor with the in-page editor is a powerful combination of features that empowers content creators and editors to visualize and edit their content in real-time, directly within the context of their live website or application. With this seamless integration, users can preview and make on-the-fly adjustments to their content, ensuring a smooth and efficient content management process.

## Installation

To install the JavaScript Visual Editor SDK, you can either use `npm` or take advantage of global CDNs like `jsdelivr`.

### npm 

To install the SDK via `npm`, run this command:

```
npm i @penzle/visual-editor --save
```

### UMD Bundles

For UMD bundles, include the library using a `script` tag on your `HTML` page. The library will be accessible through the `penzleVisualEditor` global variable.

UMD bundles can be found in the `dist/bundles` folder.

-   `dist/bundles/penzle-visual-editor.js`
-   `dist/bundles/penzle-visual-editor.min.js`

#### CDN Options

Choose between two available CDN options for the Penzle JavaScript Delivery SDK: the standard UMD bundle and the minified UMD bundle.

##### Standard UMD Bundle (penzle-delivery.js)

![Gzip UMD bundle](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/@penzle/visual-editor@latest/dist/bundles/penzle-visual-editor.js?compression=gzip)

Use the following link to include the standard UMD bundle:

```
https://cdn.jsdelivr.net/npm/@penzle/visual-editor@latest/dist/bundles/penzle-visual-editor.js
```

##### Minified UMD Bundle (penzle-visual-editor.min.js)

![Gzip UMD Minified bundle](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/@penzle/visual-editor@latest/dist/bundles/penzle-visual-editor.min.js?compression=gzip)

Use the following link to include the minified UMD bundle:

```
https://cdn.jsdelivr.net/npm/@penzle/visual-editor@latest/dist/bundles/penzle-visual-editor.min.js
```

## Using Penzle Visual Editor in Different Environments

The usage of the Penzle Visual Editor in various environments and formats.

### TypeScript & ES6

This section demonstrates how to use the Penzle Visual Editor SDK with TypeScript and ES6. It provides an example of importing the Visual Editor, initializing the delivery client, retrieving article entries, and accessing data from the first item.

```typescript
import { PenzleVisualEditor } from '@penzle/visual-editor';

// Initialize the Penzle Visual Editor
PenzleVisualEditor.create({
   enablePageEditing: true,
   enablePageLiveUpdates: true
});
```

### JavaScript & CommonJS

This section showcases the use of the Penzle Delivery SDK with JavaScript and CommonJS. It demonstrates how to require the SDK, initialize the delivery client, retrieve article entries, and access data from the first item.

```javascript
const penzleVisualEditor = require('@penzle/visual-editor');

penzleVisualEditor.create({
   enablePageEditing: true,
   enablePageLiveUpdates: true
});
```

## HTML & UMD & CDN

This section illustrates how to incorporate the Penzle Delivery SDK in an HTML file using UMD and CDN. The example provided demonstrates how to include the SDK using a script tag, initialize the delivery client, retrieve article entries, and display the results in the browser console.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Penzle Delivery JavaScript SDK</title>
        <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/@penzle/visual-editor@latest/dist/bundles/penzle-visual-editor.min.js"
        ></script>
    </head>
    <body>
        <script type="text/javascript">
            var penzleVisualEditor = window['penzleVisualEditor'];

            penzleVisualEditor.create({
               enablePageEditing: true,
               enablePageLiveUpdates: true
            });
        </script>
    </body>
</html>
```

## API SDK Documentation

The `create` method of the `PenzleVisualEditor` class from the @penzle/visual-editor package is a configuration method. This method enables developers to define certain parameters that customize the behavior of the Visual Editor SDK. These parameters will influence how you interact with and use the SDK throughout your preview session.

Below, you will find descriptions of the parameters that you can set within the `create` configuration object.

 - `enablePageEditing`:  A boolean value that controls the activation of the inspector mode. The inspector mode is enabled by default (true), but you can choose to disable it (false) using this parameter. When the inspector mode is on, it provides more detailed information about the content model and the structure of the returned data.

 - `enablePageLiveUpdates`: A boolean value that toggles the live updates feature. By default, this feature is turned on (true), but you can choose to turn it off (false). When enabled, the SDK automatically refreshes and displays the latest changes made in the Penzle environment.

Here is an example of how you can initialize the SDK with custom configuration:

```typescript
import { PenzleVisualEditor } from '@penzle/visual-editor';

// Initialize the delivery client
PenzleVisualEditor.create({
   enablePageEditing: true,
   enablePageLiveUpdates: true
});

```

## Field Tagging

In the context of the Penzle Visual Editor SDK, field tagging is a crucial feature that allows you to make the live updates. This technique involves adding certain `data-attributes` to the HTML elements that are being rendered, specifically `data-entry-id` and `data-field`.

These data-attributes, or tags, act as identifiers that link the rendered HTML elements back to the corresponding fields in your Penzle content model. This connection is leveraged by the Inspector Mode to provide an interactive and detailed view of your content structure.

The `data-entry-id` attribute holds the ID of the entry that the field belongs to. Meanwhile, the `data-field` attribute stores the ID of the field itself. By including these data-attributes in your HTML elements, you help the SDK to map the output on the screen to the original content stored in Penzle.

Here's a quick example of how to tag a field in your HTML:

```html
<h1 data-entry-id="your-entry-id" data-field="your-field-name">
  Your Content Here
</h1>
```

Make sure to replace 'your-entry-id' and 'your-field-name' with the actual IDs of your entry and field, respectively. With these tags in place, Inspector Mode will be able to provide a detailed insight into your content directly from the live preview.

Remember, using field tagging is necessary if you want to enable the Inspector Mode, as it relies on these tags to trace the content back to its source in Penzle.


## Running Tests

In order to validate your code and ensure its correct functioning, it's essential to run tests. Note that for certain tests, specifically those run through Karma, the Google Chrome browser is required.

-   `npm run test:browser` This command initiates the execution of test cases in the Google Chrome browser.

## Reach out to us

### Need Help Using This Library?

If you need any assistance regarding the use of this library, we have several resources available to support you:
-  **Questions**: Reach out to our [support](https://www.penzle.com/support)
- **Instant Messaging**: For more immediate, casual conversation, our
[![Discord Channel](https://img.shields.io/discord/991274367197663242?label=Discord&logo=Discord&logoColor=white)](https://discord.gg/2aK8pF6WK2) is a great place to connect with both the team and other users.

### Encountered an Issue or Have a Suggestion

If you've come across a bug or have an idea for a new feature, we would love to hear from you!
You can also open an issue on the GitHub repository or submit a pull request with improvements to the code: [![File an issue](https://img.shields.io/badge/-Create%20Issue-6cc644.svg?logo=github&maxAge=31557600)](https://github.com/Penzle/Penzle.Delivery.SDK.JS/issues/new)

### Need to Share Sensitive Information or Have Additional Inquiries?

If you need to share private data or have any other questions that weren't addressed, please don't hesitate to
[reach out](https://www.penzle.com/support).

## Contribution

We welcome contributions to this library. If you are interested in contributing, please read the [CONTRIBUTING](./CONTRIBUTING.md) file for more information on how to get started. Your help is appreciated, and every contribution counts in making our project better.

## Code of Conduct

Our aim is to foster a community that is respectful, inclusive, welcoming, and free from any form of harassment. We want all participants to feel safe, regardless of their gender identity, sexual orientation, disability, physical appearance, socioeconomic status, body size, ethnicity, nationality, experience level, age, religious beliefs, or any other aspect of identity.

[Read our full Code of Conduct](./CODE_OF_CONDUCT.md).

## License

This SDK is released under the [MIT License](./LICENSE).
