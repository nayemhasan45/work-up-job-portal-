# Work-Up Server

This is the server-side of the Work-Up job portal project. It is a Node.js application that uses the Express.js framework and MongoDB as its database. The server provides APIs for the job portal's front-end.

## Key Technologies

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **MongoDB:** NoSQL database.
*   **dotenv:** Module to load environment variables from a `.env` file.
*   **cors:** Middleware to enable Cross-Origin Resource Sharing.

## Architecture

The main application logic is in `index.js`. This file:

1.  Initializes an Express application.
2.  Connects to a MongoDB database using credentials from a `.env` file.
3.  Sets up middleware for CORS and JSON parsing.
4.  Defines a simple route for the root URL (`/`).
5.  Starts the server on the port specified in the environment variables or port 3000 by default.

## Building and Running

### Prerequisites

*   Node.js and npm installed.
*   A MongoDB database instance.

### Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root of the project.
2.  Add the following environment variables to the `.env` file:
    ```
    DB_USER=<your-database-user>
    DB_PASS=<your-database-password>
    ```

### Running the Application

To start the server, run the following command:

```bash
node index.js
```

The server will start on the port specified in the environment variables or port 3000 by default.

### Running in Development

For development, you can use `nodemon` to automatically restart the server when file changes are detected.

```bash
npm install -g nodemon
nodemon index.js
```

## Development Conventions

*   **Dependencies:** All dependencies are listed in the `package.json` file.
*   **Environment Variables:** All secrets and environment-specific configurations are stored in a `.env` file.
*   **Code Style:** The code follows standard JavaScript conventions.
