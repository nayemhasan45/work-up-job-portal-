# Work-Up Server

## Badges

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-^14.17.0-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-^4.17.1-blue.svg)

This is the server-side of the Work-Up job portal project. It is a Node.js application that uses the Express.js framework and MongoDB as its database. The server provides APIs for the job portal's front-end.

## Features

- **User Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **Job Management:** Create, read, and manage job listings.
- **Applicant Tracking:** Track applicants for each job.
- **Secure Cookies:** Uses `httpOnly` cookies to store JWT tokens for enhanced security.

## Project Structure

```
work-up-server/
├── .env
├── .gitignore
├── index.js
├── LICENSE
├── node_modules/
├── package-lock.json
├── package.json
└── README.md
```

- **`index.js`**: The main entry point of the application.
- **`package.json`**: Contains project metadata and a list of dependencies.
- **`.env`**: Stores environment variables for the project.

## Key Technologies

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database.
- **dotenv:** Module to load environment variables from a `.env` file.
- **cors:** Middleware to enable Cross-Origin Resource Sharing.
- **cookie-parser:** Middleware to parse cookies.
- **jsonwebtoken:** To generate and verify JSON Web Tokens.

## Architecture

The main application logic is in `index.js`. This file:

1.  Initializes an Express application.
2.  Connects to a MongoDB database using credentials from a `.env` file.
3.  Sets up middleware for CORS, JSON parsing and cookie parsing.
4.  Defines routes for handling job and applicant data.
5.  Starts the server on the port specified in the environment variables or port 3000 by default.

## API Reference

### Authentication

- `POST /jwt`: Creates a JWT token for a user.

### Jobs

- `GET /jobs`: Retrieves a list of all jobs.
- `GET /jobs/:id`: Retrieves a single job by its ID.
- `POST /jobs`: Adds a new job.

### Applicants

- `GET /applicant`: Retrieves a list of applicants for a specific user.
- `POST /applicant`: Adds a new applicant.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `MONGODB_URI`: Your MongoDB connection string (SRV or standard URI).
- `MONGODB_DB_NAME`: The database name to use (e.g., `workup`).
- `JWT_TOKEN_SECRET`: Your secret for generating JWT tokens.
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS.

## Run Locally

1.  Clone the repository:

```bash
https://github.com/al-amin-dev/work-up-server.git
```

2.  Install dependencies:

```bash
npm install
```

3.  Start the server:

```bash
npm start
```

## Deployment

To deploy this project, you can use any service that supports Node.js applications. Here is an example for Vercel:

1.  Create a `vercel.json` file in the root of your project with the following content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

On Vercel, set the environment variables `MONGODB_URI`, `MONGODB_DB_NAME`, `JWT_TOKEN_SECRET`, and `ALLOWED_ORIGINS` in the Project Settings → Environment Variables. For cross-site cookies, ensure your domain is included in `ALLOWED_ORIGINS` and that you are using HTTPS in production.

2.  Push your code to a GitHub repository.

3.  Import your repository to Vercel and deploy.

## FAQ

**Question:** How do I change the port the server runs on?

**Answer:** You can change the port by setting the `PORT` environment variable in your `.env` file.

**Question:** Is this application ready for production?

**Answer:** This application is intended for demonstration purposes and is not ready for production without further development.

## Development Conventions

- **Dependencies:** All dependencies are listed in the `package.json` file.
- **Environment Variables:** All secrets and environment-specific configurations are stored in a `.env` file.
- **Code Style:** The code follows standard JavaScript conventions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Support

For support, please open an issue on the [GitHub repository](https://github.com/al-amin-dev/work-up-server/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Al-Amin** - [https://github.com/al-amin-dev](https://github.com/al-amin-dev)
