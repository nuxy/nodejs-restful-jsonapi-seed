module.exports = {
  swagger: '2.0',
  info: {
    title: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version
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
