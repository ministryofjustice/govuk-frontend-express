# GOVUK Frontend Express
[![Standards Icon]][Standards Link]

![govuk-frontend 5.8.0](https://img.shields.io/badge/govuk--frontend%20version-5.8.0-005EA5?logo=gov.uk&style=flat)

Express.js is a fast, unopinionated, minimalist web framework for Node.js.

**GOVUK Frontend Express is a community tool using the GOV.UK Design System. The Design System team is not responsible for it and cannot support you with using it. Contact the maintainers directly if you need help or you want to request a feature.**

This is a template app using the GOV.UK Frontend and GOV.UK Design System which is designed to get a new project started quicker.

The app is provided intentionally bare, with just the essential parts that all services need, such as error pages, accessibility statement and privacy notice. It uses a number of other packages to provide the [features](#features) described below with sensible and best-practice defaults. Please read the next steps section for guidance on how to start building out your app on top of this template.

## Contents
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Set local environment variables](#set-local-environment-variables)
  - [Install and run application for development](#install-and-run-application-for-development)
  - [Install and run application for production](#install-and-run-application-for-production)
    - [Node Version Manager](#node-version-manager)
- [Routing](#routing)
- [Testing](#testing)
  - [Unit/Integration Testing example frameworks](#unitintegration-testing-example-frameworks)
  - [E2E Testing example frameworks](#e2e-testing-example-frameworks)
- [Features](#features)
- [Contributors](#contributors)
- [Support](#support)
  - [Manage Outside Collaborators](#manage-outside-collaborators)
- [Acknowledgment and Attribution](#acknowledgment-and-attribution)
- [Licence](#licence)

## Prerequisites
- node stable version [22.13.1]

## Getting started

### Set local environment variables

Create your local config file `.env` from the template file:

```shell
cp .env.example .env
```

### Align to the Node Version specified for this project

If using Node Version Manager (nvm), use the following command to switch to the correct version:
```shell
nvm use
nvm install
```

### Install dependencies and run application for development
```shell
npm install
npm run build
npm run dev
```
Then, load http://localhost:3000/ in your browser to access the app.

### Install dependencies and run application for production
```shell
npm install
npm run build
npm run start
```

#### Node Version Manager

You may have to tell your local machine to use the latest version of node already installed on your device, before installing and running the application. Use the following command.

```shell
nvm install node
```

## Routing
This template uses the built-in Express JS routing. 

A route is a section of Express code that associates an HTTP verb (`GET`, `POST`, `PUT`, `DELETE`, etc.), a URL path/pattern, and a function that is called to handle that pattern.

[You can find further documentation here](https://expressjs.com/en/guide/routing.html).

## Testing
There are many frameworks to test your Express.js application (a few of these frameworks will be signposted below), but you will want to split out your test suite to cover:

- Unit Tests - test individual code components to ensure each function operates as intended.
- Integration Tests - assess the coherence of the entire application, ensuring smooth interactions between various parts.
- End-to-end (E2E) Tests - assess the entire software system, from the user interface to the database.

### Unit/Integration Testing example frameworks
- Choose a testing framework (e.g., [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/)).
- Write test cases for individual functions and combined modules.
- Mock dependencies (e.g., databases, external services).
- Run tests and check outputs against expected results.

### E2E Testing example frameworks
- Choose an E2E testing tool (e.g., [Cypress](https://www.cypress.io/), [Selenium](https://medium.com/@mpgelber7495/a-step-by-step-guide-to-setting-up-selenium-webdriver-with-node-js-1167bca35c38)).
- Write test scripts simulating user interactions.
- Set up a test environment mirroring production.
- Run tests and verify overall application behaviour.

## Features
  - [Asset management](#asset-management)
  - [Cache busting](#cache-busting)
  - [Form validation](#form-validation)
  - [CSRF protection](#csrf-protection)
  - [Content Security Policy (CSP)](#content-security-policy-csp)
  - [Response compression](#response-compression)
  - [Rate limiting](#rate-limiting)
  - [Nunjucks support](#nunjucks-support)
  - [ES6 JS Documentation](#es6-js-documentation)
  - [Linter](#linter)
  - [Axios](#axios)
  - [SQLite database](#sqlite-database)
  - [Further reading](#further-reading)

### Asset management
This is node.js scripts at them moment, but [ESBuild](https://esbuild.github.io/) coming soon.

### Cache busting
Caching allows Express.js applications to store and serve frequently requested data efficiently, reducing the strain on servers and minimizing latency. This template improves caching through:
- intelligent browser caching, when using the template for development of an application
- employing a package management tool, to improve the caching process of installing, upgrading, configuring, and removing software from your application

### Form validation
This template app contains a basic demo for form validation, when running this app locally. You can find further information on the validation used, by searching in the [Express documentation](https://www.npmjs.com/package/express-validator)


### CSRF protection
The template uses the [csrf-sync](https://www.npmjs.com/package/csrf-sync/v/1.0.2) middleware, to help keep your app secure.

### Content Security Policy (CSP)
This app uses [helmet.js](https://helmetjs.github.io/) to help secure this Express.js template app by setting HTTP response headers, which includes your CSP. 

### Response compression
The app uses a Node.js compression middleware called [compression](https://www.npmjs.com/package/compression). The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.


### Rate limiting
This template uses a basic rate-limiting middleware for Express.js, called `express-rate-limit`. It is used to limit repeated requests to public APIs and/or endpoints such as password reset. 

For further information please [visit the documentation here](https://www.npmjs.com/package/express-rate-limit?activeTab=readme).


### Nunjucks support
A rich, high-performance JavaScript templating language, supported by all modern browsers. Nunjucks is customisable with extensions and filters; it offers inheritance, asynchronous control, auto escaping and other features. 

[Nunjucks documentation](https://mozilla.github.io/nunjucks/).

### ES6 JS Documentation
ES6 refers to version 6 of the ECMA Script programming language. ECMA Script is the standardized name for JavaScript, and version 6 is the next version after version 5, released in 2011. It is a significant enhancement to the JavaScript language and adds many more features to simplify large-scale software development.

Find out more [here](https://www.makeuseof.com/tag/es6-javascript-programmers-need-know/).

### Linter
ESLint is a static code analysis tool for identifying and fixing problems in JavaScript code. It helps maintain code 
quality and consistency across a project by enforcing a set of coding standards and best practices. ESLint can catch 
syntax errors, stylistic issues, and potential bugs before they become actual problems.

To run ESlint:

```shell
npm run lint
```

### Axios
Within this template [axios](https://github.com/axios/axios) with [middleware-axios](https://github.com/krutoo/middleware-axios) (used as a utility `../utils/axiosSetup.mjs`, and can be extended with further middleware) is set up and ready to use out of the box.

Below is an example of implementation of how to use the `axios_api` function, in other modules to make server/api calls:

```mjs
// routes/index.mjs
import express from 'express';
const router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index', { title: 'Express' });
});
// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get('/users', async (req, res, next) => {
  try {
      // Use the wrapped Axios instance attached to the request object (via middleware-axios)
      const response = await req.axiosMiddleware.get('https://jsonplaceholder.typicode.com/users');
      res.json(response.data);
  } catch (error) {
      next(error);
  }
});
export default router;
```


### SQLite database
In this template, [SQLite3](https://docs.python.org/3/library/sqlite3.html) is set up and ready to use out of the box. However, if you wish to use something
else as your database, please see [Database integration Options](https://expressjs.com/en/guide/database-integration.html).

You'll find 2 main js files: `utils/sqliteSetup.js` & `middleware/setupDB.js`.

- `utils/sqliteSetup.js`, is where you can make your database connection and initialise your database schema. In this template we create a dummy users table with `id`, `name`, and `email fields`.

```mjs
  // Initialize your database schema here.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);
```

- `middleware/setupDB.js`, is set up to allow database queries to be run against your SQLite3. It sets up your database to access any of your routes, such as this example below.
```mjs
router.get('/users', async (req, res, next) => {
  try {
    const rows = await req.db.all("SELECT * FROM users");
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### Further reading 
Please refer to the specific packages documentation for more details.


## Contributors
- [Patrick Sweeting](https://github.com/psweeting1) (Primary maintainer)
- [Imtiaz Ahmed](https://github.com/imtiazAhmd) (Primary maintainer)
- [Masum Khan](https://github.com/MazOneTwoOne) (Maintainer)

## Support
This software is provided *"as-is"* without warranty. Support is provided on a *"best endeavours"* basis by the maintainers and open source community.

If you are a civil servant you can sign up to the [UK Government Digital Slack](https://ukgovernmentdigital.slack.com/signup) workspace to contact the maintainers listed [above](#contributors) and the community of people using this project in the [#govuk-design-system](https://ukgovernmentdigital.slack.com/archives/C6DMEH5R6) channel.

### Manage Outside Collaborators

To add an Outside Collaborator to the repository, follow the guidelines detailed [here](https://github.com/ministryofjustice/github-collaborators).

## Acknowledgment and Attribution
If you find this project helpful and decide to use it in your own work, we kindly ask that you give proper credit to this repository. A simple acknowledgment in your project's documentation, website, or application would be greatly appreciated. Here are a few ways you can do this:
- **Link back to this repository**: Include a link to this GitHub repository in your project's documentation or README file.
- **Mention our contribution**: When discussing your project or presenting it to others, please mention that part of your project is based on our work.
- **Cite our work**: If your project includes a list of contributors or a "Credits" section, consider adding our repository as one of the sources.

```
This project uses code from [Your Repository Name](https://github.com/yourusername/your-repository), originally developed by [Your Name or Organization].
```
Thank you for your support and for helping to spread the word about our work!

## Licence

[Licence](./LICENSE)

[Standards Link]: https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/public-report/govuk-frontend-express "Change this to point at your repo. Also needs changing in the url in the icon below."
[Standards Icon]: https://img.shields.io/endpoint?labelColor=231f20&color=005ea5&style=for-the-badge&label=MoJ%20Compliant&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fendpoint%2Fgovuk-frontend-express&logo=data:image/png;base64,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