## Onigiri API

RESTful API for Onigiri built with Node.js, Express, Passport and MongoDB.

With **Onigiri**, you can create and analyze surveys right in your pocket or web browser —no special software required. You get results as they come in and, you can summarize survey results at a glance with graphs.

## Demo

Hosted on Heroku at [https://onigiri-webapp.herokuapp.com/](https://onigiri-webapp.herokuapp.com/)

## Development configuration

### Prettier

We will configure Prettier to format our code based on our ESLint rules.

First we need to install [prettier-eslint](https://www.npmjs.com/package/prettier-eslint) by running

`yarn add prettier-eslint --dev`

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

## Related projects

### [onigiri-webapp](https://github.com/rxseven/onigiri-webapp)

Single Page Application built with React and Redux.

## Credits

Onigiri is developed and maintained by [Theerawat Pongsupawat](https://www.linkedin.com/in/pongsupawat/), frontend web developer from Chiang Mai, Thailand.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.