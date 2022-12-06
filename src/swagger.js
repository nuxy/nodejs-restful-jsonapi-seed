module.exports = {
  swagger: '2.0',
  info: {
    title: 'nodejs-restful-jsonapi-seed',
    description: 'Everything you need to start building a scalable web application.',
    version: '1.9.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  consumes: [
    'application/vnd.api+json'
  ],
  produces: [
    'application/vnd.api+json'
  ],
  definitions: {
    ValidationError: {
      type: 'object',
      properties: {
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                example: 'Invalid parameter'
              },
              details: {
                type: 'string',
                example: 'Allowed values: Numeric characters'
              },
              source: {
                type: 'object',
                properties: {
                  param: {
                    type: 'string',
                    example: 'age'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
