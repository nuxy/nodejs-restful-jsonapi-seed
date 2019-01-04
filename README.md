# Node.js Express restful JSON API seed

[![npm version](https://badge.fury.io/js/nodejs-restful-jsonapi-seed.svg)](https://badge.fury.io/js/nodejs-restful-jsonapi-seed) [![](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/nodejs-restful-jsonapi-seed) [![Build Status](https://travis-ci.org/nuxy/nodejs-restful-jsonapi-seed.svg?branch=master)](https://travis-ci.org/nuxy/nodejs-restful-jsonapi-seed)

Everything you need to start building a scalable web application.

![the "seed" app](https://raw.githubusercontent.com/nuxy/nodejs-restful-jsonapi-seed/master/package.png)

## Features

- ECMAScript 2015 (ES6) compatible.
- RESTful application interface.
- JSON API standard request/responses.
- ABAC (Attribute-Based Access Control)
- Database driver support.
- Session handling using cookies.
- Schema-based validation.
- Production process manager.
- ESDoc App/Swagger API documentation.
- Deployable as a Docker service.

## Dependencies

- [Node.js](https://nodejs.org)
- [Docker](https://docker.com) (optional)

## Installation

### seed-cli

Install the command-line utility using [NPM](https://npmjs.com).

    $ npm install -g nodejs-restful-jsonapi-seed
    $ seed-cli --help

    Usage: seed-cli [options]

    Options:
      --create [project-name]  Create a new seed project
      --build                  Compile sources (using Babel) to a distribution
      --start                  Launch a single server from a compiled distribution
      --deploy                 Launch a server cluster from a compiled distribution
      --watch                  Launch the server (development mode)
      --lint                   Run ESLint on project sources
      --test                   Run Mocha integration tests
      --docker                 Deploy your application as a Docker service
      --gendoc                 Generate documentation using ESDoc
      -h, --help               output usage information

### Manual

Clone the repository, or download the latest [release](https://github.com/nuxy/nodejs-restful-jsonapi-seed/releases).

    $ git clone https://github.com/nuxy/nodejs-restful-jsonapi-seed.git

Install package dependencies using [NPM](https://npmjs.com).

    $ npm install

## Developers

### CLI options

Set your environment. If `NODE_ENV` is not defined, the default config `development` is used.

    $ export NODE_ENV=<production|staging|qa>

Compile sources (using [Babel](https://babeljs.io)) to a distribution:

    $ npm run build

Launch a _single server_ from a compiled distribution:

    $ npm run start

Launch a _server cluster_ from a compiled distribution:

    $ npm run deploy

Launch the server (development mode) with [nodemon](https://nodemon.io):

    $ npm run watch

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Run [Mocha](https://mochajs.org) integration tests:

    $ npm run test

Deploy your application as a [Docker](https://docker.com) service:

    $ npm run docker

Generate documentation using [ESDoc](https://esdoc.org):

    $ npm run gendoc

## API Examples

The following [routes](src/routes/examples) have been enabled in the application.  When the server is running in _development_ mode [Swagger](https://swagger.io) generated documentation can be accessed at: [http://localhost:3000/api-doc](http://localhost:3000/api-doc)

## Documentation

When the server is running in _development_ mode [ESDoc](https://esdoc.org) generated documentation can be accessed at: [http://localhost:3000/app-doc](http://localhost:3000/app-doc)

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [Node.js style guide](https://github.com/felixge/node-style-guide))

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_nodejs-restful-jsonapi-seed_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
