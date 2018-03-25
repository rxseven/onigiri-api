## Prettier Setup

We will configure Prettier to format our code based on our ESLint rules.

First we need to install [prettier-eslint](https://www.npmjs.com/package/prettier-eslint) by running

### `yarn add prettier-eslint --dev`

We want Visual **Studio Code** to format our code using **Prettier** after saving a file.

Press `CMD + ,` if you’re on a Mac to open your Workspace Settings then add the following:

```json
// Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
"editor.formatOnSave": true,
// Enable/disable default JavaScript formatter (For Prettier)
"javascript.format.enable": false,
// Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
"prettier.eslintIntegration": true
```
