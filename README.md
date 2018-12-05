# Onigiri API

[![Build Status](https://travis-ci.org/rxseven/onigiri-api.svg?branch=master)](https://travis-ci.org/rxseven/onigiri-api 'Build Status') [![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/ 'CC BY-NC-ND 4.0') [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0 'AGPL v3')

RESTful API for Onigiri built with Node.js, Express, Passport and MongoDB.

With **Onigiri**, you can create and analyze surveys right in your pocket or on your personal laptop —no special software required. You get results as they come in and, you can summarize survey results at a glance with graphs.

> Onigiri (おにぎり) also known as rice ball, is a Japanese food made from white rice formed into triangular or cylindrical shapes and often wrapped in seaweed. For more information, see [Wikipedia](https://en.wikipedia.org/wiki/Onigiri).

## Table of Contents

### Getting Started

- [Live Demo](#live-demo)

### Development

- [Running the API Server](#running-the-api-server)
- [Running Tests](#running-tests)

### Specifications

- [Development Workflow](#development-workflow)

### Appendix

- [Related Projects](#related-projects)
- [Changelog](#changelog)
- [Acknowledgements](#acknowledgements)
- [Licenses](#licenses)

## Live Demo

**Onigiri Webapp** is running on **Heroku** at [https://onigiri-webapp.herokuapp.com](https://onigiri-webapp.herokuapp.com)

> **App sleeping...** as Onigiri and its API run on [Heroku’s free plan](https://www.heroku.com/free), when an app on Heroku has only one web dyno and that dyno doesn’t receive any traffic in 1 hour, the dyno goes to sleep. When someone accesses the app, the dyno manager will automatically wake up the web dyno to run the web process type. **This causes a short delay for this first request**, but subsequent requests will perform normally. For more information, see [App Sleeping on Heroku](https://blog.heroku.com/app_sleeping_on_heroku).

> **Daily limit** as Onigiri API runs on [SendGrid’s free plan](https://sendgrid.com/free/), and the free trial is already expired, at which point, **Onigiri is restricted to sending 100 emails per day**. For more information, see [SendGrid Pricing & Plans](https://www.sendgrid.com/pricing/).

> **Login with Facebook** button won’t work for you because the relevant Facebook app is still in [development mode](https://developers.facebook.com/docs/apps/managing-development-cycle), and you don’t have access to it.

[Back to top](#table-of-contents)

## Running the API Server

### Prerequisites

Before getting started, you are required to have or install the following tools on your machine:

- [Git](https://git-scm.com) _(v2.17.2\*)_
- [nvm](https://github.com/creationix/nvm/releases/tag/v0.33.5) *(v0.33.5\*)* and [Node.js](https://nodejs.org/en/blog/release/v8.9.3/) *(v8.9.3\*)*
- [npm](https://github.com/npm/npm/releases/tag/v5.5.1) *(v5.5.1\*)* or [Yarn](https://github.com/yarnpkg/yarn/releases/tag/v1.3.2) *(v1.3.2\*)*
- [MongoDB](https://github.com/mongodb/mongo/releases/tag/r3.6.6) _(v3.6.6\*)_

> Note: if you would prefer not to install and configure MongoDB on your own, you can use [Database-as-a-Service](https://en.wikipedia.org/wiki/Cloud_database) for MongoDB, e.g. [mLab](https://mlab.com).

Optional, but nice to have:

- [Visual Studio Code](https://code.visualstudio.com)\*\*
- [Google Chrome](https://www.google.com/chrome/)\*\*
- [iTerm2](https://iterm2.com)\*\* _(for macOS)_

### Setup

**1.** Download and install a specific version of Node.js using nvm:

```sh
nvm install 8.9.3
```

**2.** Use specific Node.js version specified in [`.nvmrc`](https://github.com/rxseven/onigiri-api/blob/master/.nvmrc) file:

```sh
nvm use
```

> Note: `nvm use` command isn’t meant to persist, [it’s only for the lifetime of the shell](https://github.com/creationix/nvm/issues/658#issuecomment-74147703).

**3.** Install the dependencies listed within [`package.json`](https://github.com/rxseven/onigiri-api/blob/master/package.json) file:

```sh
yarn
```

**4.** Open [`./config/default.js`](https://github.com/rxseven/onigiri-api/blob/master/config/default.js) file and complete the default configuration:

```js
module.exports = {
  campaign: {
    landing: '<CAMPAIGN_LANDING>',
    sender: '<CAMPAIGN_SENDER>'
  },
  doorway: {
    URI: '<DOORWAY_URI>',
    tracking: '<DOORWAY_TRACKING>'
  },
  facebook: {
    clientID: '<FACEBOOK_CLIENT_ID>',
    clientSecret: '<FACEBOOK_CLIENT_SECRET>'
  },
  google: {
    clientID: '<GOOGLE_CLIENT_ID>',
    clientSecret: '<GOOGLE_CLIENT_SECRET>'
  },
  mongoDB: {
    URI: '<MONGODB_URI>'
  },
  sendgrid: {
    key: '<SENDGRID_KEY>'
  },
  stripe: {
    key: {
      publishable: '<STRIPE_PUBLISHABLE>',
      secret: '<STRIPE_SECRET>'
    }
  },
  token: {
    secret: '<JWT_SECRET>'
  }
};
```

Where:

- [`<CAMPAIGN_LANDING>`](https://github.com/rxseven/onigiri-api/blob/master/config/default.js#L3) is a campaign landing page URI, the default is `null`.
- [`<CAMPAIGN_SENDER>`](https://github.com/rxseven/onigiri-api/blob/master/services/Mailer.js#L13) is a sender email address.
- [`<DOORWAY_URI>`](https://github.com/rxseven/onigiri-api/blob/master/templates/emails/surveys.js#L22) is a doorway landing page URI, e.g. [`https://onigiri-webapp.local`](https://github.com/rxseven/onigiri-webapp/blob/master/.env.development#L2).
- [`<DOORWAY_TRACKING>`](https://github.com/rxseven/onigiri-api/blob/master/controllers/surveys.js#L248) is a doorway tracking path, the default is [`/surveys/doorway`](https://github.com/rxseven/onigiri-webapp/blob/master/src/constants/router/paths.js#L18).
- [`<FACEBOOK_CLIENT_ID>`](https://developers.facebook.com/docs/apps/) is a unique Facebook app ID, it must be included when making any calls to Facebook APIs.
- [`<FACEBOOK_CLIENT_SECRET>`](https://developers.facebook.com/docs/facebook-login/security/#appsecret) is a secret string associated with the Facebook app ID, it’s used in some of the login flows to generate access tokens.
- [`<GOOGLE_CLIENT_ID>`](https://developers.google.com/identity/protocols/OAuth2) is a unique Google app ID used to identify Onigiri with Google.
- [`<GOOGLE_CLIENT_SECRET>`](https://developers.google.com/identity/protocols/OAuth2) is a secret string associated with the Google app ID.
- [`<MONGODB_URI>`](https://docs.mongodb.com/manual/reference/connection-string/) is a standard format of the MongoDB connection URI used to connect to a MongoDB database server.
- [`<SENDGRID_KEY>`](https://sendgrid.com/docs/ui/account-and-settings/api-keys/) is a unique SendGrid API key used by Onigiri to authenticate access to SendGrid services.
- [`<STRIPE_PUBLISHABLE>`](https://stripe.com/docs/keys) is a publishable Stripe API key used to identify Onigiri with Stripe. It’s not secret, it can safely be published or included in [client-side](https://github.com/rxseven/onigiri-webapp/blob/master/.env.development#L5).
- [`<STRIPE_SECRET>`](https://stripe.com/docs/keys) is a secret Stripe API key, it can perform any API request to Stripe without restriction.
- [`<JWT_SECRET>`](https://github.com/auth0/node-jsonwebtoken) is a secret string (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

> Note: secret keys should be kept confidential and only [stored on your own servers](https://devcenter.heroku.com/articles/config-vars) and **never include them in client-side or decompilable code**.

### Start the server

On the command line, run the command below to start the server:

```sh
yarn start
```

You can monitor for any changes and automatically restart the server:

```sh
yarn start:watch
```

> Tip: press `control + c` to stop the server

[Back to top](#table-of-contents)

## Running Tests

There are no test suites implemented yet.

[Back to top](#table-of-contents)

## Development Workflow

- JavaScript linting with ESLint
- Code formatting with Prettier
- Automate testing with Mocha, Chai, and Expect
- Code debugging with Visual Studio Code and Chrome Debugger
- Pre-commit hooking with Husky and Lint-staged
- CI/CD with GitHub, Travis CI, Coveralls, and Heroku

[Back to top](#table-of-contents)

## Related Projects

**[Onigiri Webapp](https://github.com/rxseven/onigiri-webapp)**

Onigiri Webapp built with React and Redux.

## Changelog

See [releases](https://github.com/rxseven/onigiri-api/releases).

## Acknowledgements

This project is maintained by [Theerawat Pongsupawat](http://www.rxseven.com), frontend developer from Chiang Mai, Thailand.

## Licenses

The content of this project itself is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license](http://creativecommons.org/licenses/by-nc-nd/4.0/), and the underlying source code is licensed under the [GNU AGPLv3 license](https://www.gnu.org/licenses/agpl-3.0).

---

\* the minimum required version or higher | \*\* the latest version
