# HRIS Dashboard

[![Build Status](https://travis-ci.org/hisptz/hris-dashboard-app.svg?branch=master)](https://travis-ci.org/hisptz/hris-dashboard-app)
[![dependencies Status](https://david-dm.org/hisptz/hris-dashboard-app/status.svg)](https://david-dm.org/hisptz/idashboard)
[![devDependencies Status](https://david-dm.org/hisptz/hris-dashboard-app/dev-status.svg)](https://david-dm.org/hisptz/idashboard?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/5735498569bed0f37266/maintainability)](https://codeclimate.com/github/hisptz/hris-dashboard-app/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5735498569bed0f37266/test_coverage)](https://codeclimate.com/github/hisptz/hris-dashboard-app/test_coverage)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Greenkeeper badge](https://badges.greenkeeper.io/hisptz/idashboard.svg)](https://greenkeeper.io/)

A Dashboard with full blown interactive capabilities that lets user easily switch between multiple visualizations (tables, charts and maps), allowing user to download data for offline usage, while still shading insights into dictionary of the involved metadata. Among other interactive features includes capability to navigate through data across organisation unit hierarchy, periods and data and spark conversation on analysed data

## Prerequisites

1. [NodeJs (10 or higher)](https://nodejs.org)
2. npm (6.4.0 or higher), can be installed by running `apt install npm`
3. git, can be installed by running `apt install git`

## Setup

Clone repository

```bash
 git clone https://github.com/hisptz/idashboard.git
```

Navigate to application root folder

```bash
cd idashboard
```

Install all required dependencies for the app

```bash
npm install
```

## Development server

To start development server

`npm start`

Navigate to [http://localhost:4200](http://localhost:4200).

This command will require proxy-config.json file available in the root of your source code, usually this file has this format

```json
{
  "/api": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}
```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Index DB Setup

This app support index DB as based on [dexie library](https://dexie.org/). In order to initiatiate index db then you have to passed index db configuration in forRoot of core module, so in app.module.ts

```ts
........
@NgModule({
  declarations: [AppComponent, ...fromPages.pages],
  imports: [
   ..........
    CoreModule.forRoot({
      namespace: 'iapps',
      version: 1,
      models: {
        users: 'id',
        dataElement: 'id',
        .......
      }
    })
    .......
    ]
    ......
    })
```

where in the models, for example user will be a table "user" and 'id' will be a keyIndex for the table

## Build

To build the project run

`npm run build`

The build artifacts will be stored in the `dist/`, this will include a zip file ready for deploying to any DHIS2 instance.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
