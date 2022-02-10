# Node.js Express restful JSON API seed

[![npm version](https://badge.fury.io/js/nodejs-restful-jsonapi-seed.svg)](https://badge.fury.io/js/nodejs-restful-jsonapi-seed) [![](https://img.shields.io/npm/dm/nodejs-restful-jsonapi-seed.svg)](https://www.npmjs.com/package/nodejs-restful-jsonapi-seed) [![Build Status](https://travis-ci.org/nuxy/nodejs-restful-jsonapi-seed.svg?branch=master)](https://travis-ci.org/nuxy/nodejs-restful-jsonapi-seed)

Everything you need to start building a scalable web application.

![the "seed" app](https://raw.githubusercontent.com/nuxy/nodejs-restful-jsonapi-seed/master/package.png)

## Features

- ECMAScript 2015 (ES6) compatible.
- RESTful application interface.
- JSON API standard request/responses.
- ABAC (Attribute-Based Access Control)
- HTTP/1/2 and SSL support.
- Database driver support.
- Session handling using cookies.
- Schema-based validation.
- Stream-based logging and file rotation.
- Production process manager.
- JSDoc App/Swagger API documentation.
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
      --create <project-name>  Create a new seed example project
      --build                  Transpile ES6 sources (using Babel) to a distribution
      --start                  Launch a single server instance from a transpiled distribution
      --deploy                 Launch a server cluster from a transpiled distribution
      --watch                  Launch the server (development mode)
      --lint                   Run ESLint on project sources
      --test                   Run Mocha integration tests
      --docker                 Deploy your application as a Docker service
      --gendoc                 Generate documentation using JSDoc
      --env <environment>      Set the NODE_ENV (default: development)
      -h, --help               output usage information

### Manual

Clone the repository, or download the latest [release](https://github.com/nuxy/nodejs-restful-jsonapi-seed/releases).

    $ git clone https://github.com/nuxy/nodejs-restful-jsonapi-seed.git

Install package dependencies using [NPM](https://npmjs.com).

    $ npm install

## Developers

While `seed-cli` provided with this package can execute NPM scripts, it's not a requirement. You can also achieve this using [npm-run-script](https://docs.npmjs.com/cli/run-script).

### CLI options

Set your environment. If `NODE_ENV` is not defined, the default config `development` is used.

    $ export NODE_ENV=<production|staging|qa>

Transpile ES6 sources (using [Babel](https://babeljs.io)) to a distribution:

    $ npm run build

Launch a _single server instance_ from a transpiled distribution:

    $ npm run start

Launch a _server cluster_ from a transpiled distribution:

    $ npm run deploy

Launch the server (development mode) with [nodemon](https://nodemon.io):

    $ npm run watch

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Run [Mocha](https://mochajs.org) integration tests:

    $ npm run test

Deploy your application as a [Docker](https://docker.com) service:

    $ npm run docker

Generate documentation using [JSDoc](https://jsdoc.app):

    $ npm run gendoc

## API Examples

The following [routes](src/routes/examples) have been enabled in the application.  When the server is running in _development_ mode [Swagger](https://swagger.io) generated documentation can be accessed at: [http://localhost:3000/api-doc](http://localhost:3000/api-doc)

## Documentation

When the server is running in _development_ mode [JSDoc](https://jsdoc.app) generated documentation can be accessed at: [http://localhost:3000/app-doc](http://localhost:3000/app-doc)

## Enabling HTTP/2

The [http2](https://nodejs.org/api/http2.html) module is an experimental API which relies on the [Latest Current Version](https://nodejs.org/en/download/current) of Node.js to work.  Furthermore, since there are no browsers known that support unencrypted HTTP/2, the use of [X.509 certificates](https://en.wikipedia.org/wiki/X.509) is necessary when communicating with browser clients.

To set-up the server, first you must generate the certificate and key files:

    $ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout localhost-key.pem -out localhost-cert.pem

See the [Node.js documentation](https://nodejs.org/api/http2.html#http2_client_side_example) for information regarding client-side set-up.

## SSL configuration

Depending on your application requirements there are multiple ways to set-up the [server config](https://github.com/nuxy/nodejs-restful-jsonapi-seed/blob/master/config/default.json#L49):

### Absolute path

If your certificates are installed in a location outside of the application scope (e.g. `/etc/ssl/certs`), and your application has the permissions to access these files, you can add the _absolute path_ to the respective configuration values.

### String output

If, for whatever reason, you cannot host the certificates locally (shared environment), you can output each file as a newline-delimited string using the following command and add the _string output_ to the respective configuration values.

    $ cat localhost-<key|cert>.pem | perl -pe 's/\n/\\n/g'

## Common questions

> What was your motivation for creating this package?

I wanted a package that was lightweight and provided all of the Production features needed to create a scalable API server.  While there are many packages available, most are lacking or require you to sacrifice simplicity or features for little gain.

This package provides _everything_ you need to quickly build your application using a consistent and secure set of standards.

> Why use Babel, and not TypeScript?

If you are using [JSDoc tags](https://jsdoc.app/about-block-inline-tags.html) and an IDE/Editor that supports Intellisense (code completion and typing).  Complexity like this is not necessary.

> How do you set-up this package to use a custom database?

You can update the [database wrapper](https://github.com/nuxy/nodejs-restful-jsonapi-seed/blob/master/src/lib/Database.js) example to use any [DBMS](https://www.npmjs.com/search?q=dbms) package available while  extending the application [SessionStore](https://github.com/nuxy/nodejs-restful-jsonapi-seed/blob/master/src/lib/SessionStore.js) to use a compatible [Connection Session Store](https://github.com/expressjs/session#compatible-session-stores) module.

## Windows support

This package has limited support for Windows due to cross-platform compatibility issues, most notably `SHELL` environment differences. Due to this, you can either run this package in [Docker](https://docker.com) or switch to a UNIX-like operating system.

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [Node.js style guide](https://github.com/felixge/node-style-guide))

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_nodejs-restful-jsonapi-seed_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
