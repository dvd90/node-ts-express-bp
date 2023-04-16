# express-ts-boilerplate

A boilerplate project for building scalable and maintainable API applications using TypeScript, Express, MongoDB, Auth0, and Sentry, following the MVC architecture pattern.

## Features

- TypeScript for type safety and improved development experience
- Express for handling HTTP requests and routing
- MongoDB for persistence with Mongoose ODM
- Auth0 for secure authentication and authorization
- Sentry for error tracking and monitoring
- MVC architecture for scalable and maintainable code
- Environment variable configuration using dotenv
- ESLint and Prettier for code linting and formatting
- Nodemon for hot-reloading during development

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14.x or newer)
- MongoDB (v4.x or newer)
- Yarn (optional, but recommended)

### Clone the Repository

```bash
git clone https://github.com/your_username/typescript-express-mvc-boilerplate.git
cd typescript-express-mvc-boilerplate
```

### Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn
```

### Configuration

Create a `.env` file in the project root directory and provide the required environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/your-db-name
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_AUDIENCE=your-auth0-api-identifier
SENTRY_DSN=your-sentry-dsn
```

### Run the Application

```bash
# Start the development server with hot-reloading
npm run dev

# OR using yarn
yarn dev
```

## Building and Running in Production

```bash
# Build the application
npm run build

# OR using yarn
yarn build

# Start the production server
npm start

# OR using yarn
yarn start
```

## Folder Structure

.
├── src
│ ├── config
│ ├── controllers
│ ├── middlewares
│ ├── models
│ ├── routes
│ ├── services
│ ├── utils
│ └── app.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you want to contribute, please feel free to fork the repository and submit a pull request. We would love to have your contributions!
