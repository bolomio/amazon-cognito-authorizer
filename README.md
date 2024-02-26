# [bolomio] Cognito Authorizer

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/bolomio/cognito-authorizer)
[![npm version](https://badge.fury.io/js/%40bolomio%2Fcognito-authorizer.svg)](https://www.npmjs.com/package/@bolomio/cognito-authorizer)

The @bolomio/cognito-authorizer package is an open-source lightweight npm package that provides functions for authenticating with cognito using different authentication flows. It allows you to easily authenticate cognito instances in your Node.js applications.

## Features

- Authenticate with cognito using the client credential flow

## Installation

You can install the package using npm:

```bash
npm install @bolomio/cognito-authorizer
```

## Usage

```javascript
const { makecognitoAuthorizer } = require('@bolomio/cognito-authorizer');
const { HTTPError } = require('got');

// Create an instance of the cognito authorizer with custom options
const authorizer = makecognitoAuthorizer({
  baseUrl: "https://{domain-name}.auth.{region}.amazoncognito.com/",
});

async function authenticate() {
  try {
    const resource = await authorizer.authenticateWithClientCredentials({
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    });
    console.log(resource);
  } catch (e) {
    if (e instanceof HTTPError) {
      console.log(e.response.body);
    }
  }
}

authenticate();
```

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [GNU General Public License](LICENSE).
