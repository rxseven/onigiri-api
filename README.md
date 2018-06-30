# Onigiri API

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

RESTful API for Onigiri built with Node.js, Express, Passport and MongoDB.

With **Onigiri**, you can create and analyze surveys right in your pocket or web browser —no special software required. You get results as they come in and, you can summarize survey results at a glance with graphs.

## Table of Contents

* [Demo](#demo)
* [Running Onigiri Locally](#running-onigiri-locally)
* [Related Projects](#related-projects)
* [Changelog](#changelog)
* [Acknowledgements](#acknowledgements)
* [Licenses](#licenses)

## Demo

Onigiri is hosted on Heroku at [https://onigiri-webapp.herokuapp.com](https://onigiri-webapp.herokuapp.com)

## Running Onigiri Locally

### Prerequisites

#### Development environment

* [Node.js v8.9.3](https://nodejs.org/en/blog/release/v8.9.3/) or higher
* [npm v5.5.1](https://github.com/npm/npm/releases/tag/v5.5.1) or higher or [the latest version of Yarn](https://yarnpkg.com/en/)

#### Third party services

* [Facebook app ID and secret key](https://developers.facebook.com/docs/apps/register/)
* [Google app ID and secret key](https://developers.google.com/identity/protocols/OAuth2)
* [Stripe publishable and secret keys](https://stripe.com/docs/keys)
* [SendGrid API key](https://sendgrid.com/docs/Classroom/Send/How_Emails_Are_Sent/api_keys.html)
* [MongoDB URI](https://docs.mlab.com/connecting/)

### Setup

**1.** Clone Onigiri API from GitHub:

```sh
git clone https://github.com/rxseven/onigiri-api.git
```

**2.** Add your sensitive information to `config/default.js` file:

```js
module.exports = {
  campaign: {
    landing: null,
    sender: "noreply@mail.com"
  },
  doorway: {
    URI: "https://onigiri-webapp.herokuapp.com/surveys/doorway",
    tracking: "/surveys/doorway"
  },
  facebook: {
    clientID: [FACEBOOK_APP_ID],
    clientSecret: [FACEBOOK_CLIENT_SECRET]
  },
  google: {
    clientID: [GOOGLE_APP_ID],
    clientSecret: [GOOGLE_APP_SECRET]
  },
  mongoDB: {
    URI: [MONGODB_URI]
  },
  sendgrid: {
    key: [SENDGRID_API_KEY]
  },
  stripe: {
    key: {
      publishable: [STRIPE_PUBLISHABLE_KEY],
      secret: [STRIPE_SECRET_KEY]
    }
  },
  token: {
    secret: [JWT_SECRET]
  }
};
```

> Storing API Keys, or any other sensitive information, on a Git repository is something to be avoided at all costs. Even if the repository is private, you should not see it as a safe place to store sensitive information. (details are available in [this article](https://medium.freecodecamp.org/how-to-securely-store-api-keys-4ff3ea19ebda))

**3.** Install dependencies:

```sh
yarn install
```

**4.** Start the app:

```sh
yarn start
```

**5.** The app will be available at [http://localhost:5000](http://localhost:5000).

## Related Projects

**[Onigiri Webapp](https://github.com/rxseven/onigiri-webapp)**

Onigiri Webapp built with React and Redux.

## Changelog

See [releases](https://github.com/rxseven/onigiri-api/releases).

## Acknowledgements

This project is maintained by [Theerawat Pongsupawat](https://www.linkedin.com/in/pongsupawat/), frontend developer from Chiang Mai, Thailand.

## Licenses

The content of this project itself is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license](http://creativecommons.org/licenses/by-nc-nd/4.0/), and the underlying source code is licensed under the [GNU AGPLv3 license](https://www.gnu.org/licenses/agpl-3.0).
