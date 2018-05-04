# Node.js Express restful JSON API seed [![Build Status](https://travis-ci.org/nuxy/nodejs-restful-jsonapi-seed.svg?branch=master)](https://travis-ci.org/nuxy/nodejs-restful-jsonapi-seed)

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

## Dependencies

- [Node.js](https://nodejs.org)

## Installation

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

Launch a _single server_ with compiled distribution:

    $ npm run start

Launch a _server cluster_ with compiled distribution:

    $ npm run deploy

Launch the server (development mode) with [nodemon](https://nodemon.io):

    $ npm run watch

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Run [Mocha](https://mochajs.org) integration tests:

    $ npm run test

Generate documentation using [ESDoc](https://esdoc.org):

    $ npm run doc

## Examples

The following [routes](src/routes/examples) have been enabled in the application.  Please refer to each file for implementation details.

### Login

Basic example of how to authenticate using a `POST` request.

http://localhost:3000/login

    $ curl -X POST -H 'Content-Type: application/vnd.api+json' -i http://localhost:3000/login --data '{"username": "foo", "password": "bar"}'

Basic example of how to check session status using a `GET` request.

http://localhost:3000/login

    $ curl -X GET -H 'Content-Type: application/vnd.api+json' -i http://localhost:3000/login

### User

Common use case that supports `GET`, `PATCH`, `POST`, `PUT`, and `DELETE` methods.

http://localhost:3000/user

    $ curl -X GET -H 'Content-Type: application/vnd.api+json' -i http://localhost:3000/user

## Documentation

When the server is running in _development_ mode the documentation can be accessed at: [http://localhost:3000/doc](http://localhost:3000/doc)

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [Node.js style guide](https://github.com/felixge/node-style-guide))

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_nodejs-restful-jsonapi-seed_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
