# Authentication Session Project

This project implements stateless token-based authentication using Express.js, PostgreSQL, and Drizzle ORM.
It provides secure session management and a structured backend setup with JavaScript/TypeScript-ready tooling.

# 1. Prerequisites

Before starting, ensure that you have the following installed:

Node.js (v18 or higher)

pnpm (v10.22.0 or compatible)

PostgreSQL (Database server)

# Check installations:
node -v
pnpm -v
psql --version


# 2. Create a New Project

# Create a new folder and initialize the project:
mkdir authentication-session
cd authentication-session
pnpm init


# 3. Install Dependencies

# Run the following command to install all dependencies:
pnpm install

# 4. Create Environment Variables

Create a .env file in the root directory and define your environment variables:
DATABASE_URL=postgres://username:password@localhost:5432/databaseName
PORT=5000
JWT_SECRET=your-secret-key
Note: Make sure to replace the placeholder values with your actual PostgreSQL credentials.


# 5. Setup Drizzle ORM
a. Create a Drizzle Configuration File

Create a new file named drizzle.config.js in the project root with the following content:
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/schema.ts",   // Path to your schema definition
  out: "./drizzle",               // Output folder for migrations
  driver: "pg",                   // PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});
Note : Can take reference from the drizzle-orm official documentation..

b. Create a Database Schema

Inside your server/ folder, create a file named schema.js:
Note : Can take reference from the drizzle-orm official documentation..

c. Push Schema to Database

Once the schema and config are ready, run:
pnpm db:push
Note: This command applies your schema to the PostgreSQL database.

d. Open Drizzle Studio

To explore and manage your database visually:
pnpm db:studio

# 6. Create the Server File

Create a new file named server/index.js (or server.js)

# 7. Run the Project
Development Mode

Run the project in development mode with auto-reload:
pnpm dev

Production Mode

Run the project normally (no auto-reload):
pnpm start

# 8. Project Structure for example
authentication-session/
├── server/
│   ├── index.js          # Main server entry file
│   ├── schema.ts         # Database schema for Drizzle ORM
├── drizzle.config.ts     # Drizzle ORM configuration
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── node_modules/         # Installed packages
└── README.md             # Setup guide

# 9. Useful Commands

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `pnpm install`   | Install all dependencies                 |
| `pnpm dev`       | Start development server with watch mode |
| `pnpm start`     | Start server in production mode          |
| `pnpm db:push`   | Apply schema to the PostgreSQL database  |
| `pnpm db:studio` | Open Drizzle Studio interface            |


# 10. Notes

Ensure PostgreSQL service is running before executing database commands.
Update your .env file before running the server.
Use console.log() for debugging database connections and server setup.

# 11. License

This project is licensed under the ISC License.
You are free to use, modify, and distribute this project under the same license.

# Api's for reference
# Use Postman or Thunder client to test the api's 

# signup api --->> create a user

POST http://localhost:8000/user/signup 
# pass this in body as a json       
{
    "name": "User1",
    "email": "user1@gmail.com",
    "password": "useR123" 
}

# login api --->> login user to the account

POST http://localhost:8000/user/login
# pass this in body as a json 
{
    "email": "user1@gmail.com",
    "password": "user123" 
}

# when the login is done then the jwt token will be generated then pass the token in header.
# After successful login, a jwt token will be generated.
# Use this jwt token in the request headers or authorization and (in authorization select for bearer token and pass the token) when calling the /user endpoint to get the logged-in user.

# Get Current User API → Check the logged-in user

GET http://localhost:8000/user/
# Headers:
Authorization: value
value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0MWRlYTg1LTUzNDYtNGQ1ZC05OTc0LTBhYTMxNjY5MjNiMiIsImVtYWlsIjoiYW1hbkBnbWFpbC5jb20iLCJuYW1lIjoiQW1hbiBSYXdhdCIsImlhdCI6MTc2MzAyODY2OCwiZXhwIjoxNzYzMDI4Nzg4fQ.zRPcvjKLu0bF6MWrQ6odK0sSsX06LGOS0gETcESPVJI 

Token can be passed on Authorization also .. In authorization select bearer token and pass the token in the token section.

# Example bearer token format:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0MWRlYTg1LTUzNDYtNGQ1ZC05OTc0LTBhYTMxNjY5MjNiMiIsImVtYWlsIjoiYW1hbkBnbWFpbC5jb20iLCJuYW1lIjoiQW1hbiBSYXdhdCIsImlhdCI6MTc2MzAyODY2OCwiZXhwIjoxNzYzMDI4Nzg4fQ.zRPcvjKLu0bF6MWrQ6odK0sSsX06LGOS0gETcESPVJI

