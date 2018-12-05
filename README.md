# Onigiri API

[![Build Status](https://travis-ci.org/rxseven/onigiri-api.svg?branch=master)](https://travis-ci.org/rxseven/onigiri-api 'Build Status') [![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/ 'CC BY-NC-ND 4.0') [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0 'AGPL v3')

RESTful API for Onigiri built with Node.js, Express, Passport and MongoDB.

With **Onigiri**, you can create and analyze surveys right in your pocket or on your personal laptop —no special software required. You get results as they come in and, you can summarize survey results at a glance with graphs.

> Onigiri (おにぎり) also known as rice ball, is a Japanese food made from white rice formed into triangular or cylindrical shapes and often wrapped in seaweed. For more information, see [Wikipedia](https://en.wikipedia.org/wiki/Onigiri).

## Table of Contents

- [Live Demo](#live-demo)
- [Running Tests](#running-tests)
- [Development Workflow](#development-workflow)
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

## Running Tests

There are no test suites implemented yet.

[Back to top](#table-of-contents)

## Development Workflow

The complete guidelines are available in [this project](https://github.com/rxseven/setup-react-app).

## Related Projects

**[Onigiri Webapp](https://github.com/rxseven/onigiri-webapp)**

Onigiri Webapp built with React and Redux.

## Changelog

See [releases](https://github.com/rxseven/onigiri-api/releases).

## Acknowledgements

This project is maintained by [Theerawat Pongsupawat](http://www.rxseven.com), frontend developer from Chiang Mai, Thailand.

## Licenses

The content of this project itself is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license](http://creativecommons.org/licenses/by-nc-nd/4.0/), and the underlying source code is licensed under the [GNU AGPLv3 license](https://www.gnu.org/licenses/agpl-3.0).
