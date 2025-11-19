# URL Shortener Project (Node.js + Express + JWT + DrizzleORM + PostgreSQL)

## 📌 Project Summary — URL Shortener API

The URL Shortener API is a backend service built with Node.js, Express, PostgreSQL, and Drizzle ORM that allows users to create short, shareable URLs from long web links. The system includes secure user authentication, enabling only logged-in users to generate short URLs. Each shortened URL is stored in the database with a unique custom code and automatically redirects to the original long URL when accessed. The project uses Zod for validation, JWT for user authorization, and crypto-based hashing for secure password storage. This lightweight service is ideal for learning modern backend development practices, database design, REST API architecture, authentication handling, and URL mapping mechanisms.

# 🚀 URL Shortener API — Modern Node.js Backend

A fast and secure URL Shortener API built using Node.js, Express, PostgreSQL, and Drizzle ORM.
This service allows registered users to create short, shareable links from long URLs, with secure JWT-based authentication and validation using Zod.

# 🔥 Features

🔐 User Signup & Login with hashed passwords (HMAC + salt)

🔑 JWT Authentication to protect URL-shortening routes

✂️ Create Short URLs with custom short codes

🔁 Redirect Short URL → Original URL

🗄 PostgreSQL + Drizzle ORM for type-safe queries

🧪 Zod Validation for request body schemas

⚡ Fast, lightweight, and production-ready API structure.

## 🛠 Tech Stack

Node.js + Express

PostgreSQL

Drizzle ORM

Zod

Zod Validation

JSON Web Tokens (JWT)

NanoID

Crypto (HMAC for password hashing)

# A simple and secure URL Shortener service built using **Node.js**, **Express**, **JWT Authentication**, **Drizzle ORM**, **PostgreSQL**, and **Zod validation**.

This service allows users to:
* Register and login using JWT
* Shorten URLs (authenticated users only)
* Redirect to original long URLs using the short code

---


## 📦 Project Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/your-username/url-shortener-project.git
cd url-shortener-project
```

### 2️⃣ Install dependencies

Using **pnpm** (recommended):

```sh
pnpm install
```

Or using npm:

```sh
npm install
```

### 3️⃣ Create `.env` file

Inside project root:

```
DATABASE_URL=postgres://your_user:your_pass@localhost:5432/dbname
JWT_SECRET=your_secret_key
PORT=8000
```

### 4️⃣ Run database migrations (Drizzle)

```sh
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### 5️⃣ Start the server

```sh
pnpm start
```

Server will run on:

```
http://localhost:8000
```

---

## 📁 Package.json (for reference)

```json
{
  "name": "url-shortener-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node --watch server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.22.0",
  "devDependencies": {
    "@types/express": "~4.17.25",
    "@types/node": "^24.10.1",
    "@types/pg": "^8.15.6",
    "drizzle-kit": "^0.31.7",
    "tsx": "^4.20.6"
  },
  "dependencies": {
    "dotenv": "^17.2.3",
    "drizzle-orm": "^0.44.7",
    "express": "~4.21.2",
    "jsonwebtoken": "^9.0.2",
    "nanoid": "^5.1.6",
    "pg": "^8.16.3",
    "zod": "^4.1.12"
  }
}
```

---

# 🔌 API Documentation

## 1️⃣ User Signup

### **POST** `/user/signup`

#### 📝 Request Body (JSON)

```json
{
  "first_name": "user",
  "last_name": "name",
  "email": "abc@gmail.com",
  "password": "abc123"
}
```

#### ✔️ Response

* User created successfully

---

## 2️⃣ User Login

### **POST** `/user/login`

#### 📝 Request Body

```json
{
  "email": "abc@gmail.com",
  "password": "abc123"
}
```

#### ✔️ Response

* Returns **JWT Token**

Copy this token for next API calls.

---

## 3️⃣ Shorten URL

### **POST** `/shorten`

#### 🔐 Authentication

Pass JWT token inside **Authorization → Bearer Token**

#### 📝 Request Body

```json
{
  "url": "https://github.com/Deepanshu072001/Node_Api-Projects",
  "code": "mygitrepo"
}
```

#### ✔️ Response

* Short URL created successfully.

---

## 4️⃣ Redirect to Original URL

### **GET** `/{code}`

Example:

```
GET http://localhost:8000/mygitrepo
```

This will redirect you to the long URL.

Use it inside the **browser** to test redirect.

---

# 🛠 Commands Summary

### Install packages

```
pnpm install
```

### Run server

```
pnpm start
```

### Generate Drizzle schema

```
pnpm drizzle-kit generate
```

### Run migrations

```
pnpm drizzle-kit migrate
```

---

# 📁 Folder Structure Documentation

url-shortener-project/
│
├── server.js
├── package.json
├── .env
├── README.md
│
├── /db
│   ├── db_index.js                # PostgreSQL + Drizzle connection
│   ├── schema/                    # Generated schema by drizzle-kit
│   └── migrations/                # SQL migrations
│
├── /models
│   └── index.js                   # Drizzle ORM table definitions (users, urls)
│
├── /routes
│   ├── user.route.js              # Signup, Login
│   └── url.route.js               # Shorten URL, Redirect
│
├── /controllers (optional but recommended)
│   ├── user.controller.js
│   └── url.controller.js
│
├── /utils
│   ├── jwt.js                     # Token helpers
│   ├── hash.js                    # Password hashing (salt + HMAC)
│   └── response.js                # Standard API responses
│
└── /validations
    └── request.validation.js      # Zod schemas for validation



# Database ER Diagram (Simple & Clean)

┌───────────────────────────┐          ┌───────────────────────────────────┐
│         users             │          │             urls                  │
├───────────────────────────┤          ├───────────────────────────────────┤
│ id (UUID) PK              │  1    ┌──│ id (UUID) PK                      │
│ firstname (varchar)       │      │  │ user_id (UUID) FK → users.id      │
│ lastname (varchar)        │      │  │ original_url (text)               │
│ email (varchar unique)    │      └──│ short_code (varchar unique)       │
│ password (text)           │         │ created_at (timestamp)            │
│ salt (text)               │         │ hits (integer default 0)          │
│ created_at (timestamp)    │         └───────────────────────────────────┘
│ updated_at (timestamp)    │
└───────────────────────────┘
Relationship:

1 User → Many URLs

URLs table stores:

short code

original long URL

number of hits

timestamp


# Clean Explanation of the ERD

# users Table

| Column       | Purpose                        |
| ------------ | ------------------------------ |
| `id`         | Unique UUID for each user      |
| `firstname`  | User first name                |
| `lastname`   | User last name                 |
| `email`      | Unique email, used for login   |
| `password`   | Encrypted password             |
| `salt`       | Random string for HMAC hashing |
| `created_at` | Record creation timestamp      |
| `updated_at` | Auto-updated timestamp         |

# urls Table

| Column         | Purpose                                 |
| -------------- | --------------------------------------- |
| `id`           | UUID primary key                        |
| `user_id`      | Links URL to a specific user            |
| `original_url` | Long URL                                |
| `short_code`   | Custom or random short code             |
| `hits`         | Count of how many times URL was visited |
| `created_at`   | Timestamp                               |


# 🧪 API Endpoints & Example Responses

# 1️⃣ POST /user/signup
 Registers a new user.

# Request Body
{
  "first_name": "User",
  "last_name": "1",
  "email": "user@gmail.com",
  "password": "user123"
}

# Success Response
{
  "data": {
    "userId": "eab215e7-f77c-41ee-96d1-6ce06a942556"
  }
}

# 2️⃣ POST /user/login
  Logs in the user and returns a JWT token.

# Request Body
{
  "email": "user@gmail.com",
  "password": "user123"
}

# Success Response
{
  "token": "your_jwt_token_here"
}

# 3️⃣ POST /shorten
🔐 Protected Route — must use Bearer Token.

# Headers
Authorization: Bearer <your_token_here>

# Request Body
{
  "url": "https://github.com/<forexample>/<Repo name>",
  "code": "mygitrepo"
}

# Success Response
{
  "shortUrl": "http://localhost:8000/mygitrepo"
}

#4️⃣ GET /:code
Redirects to the original long URL.

# Example:
GET http://localhost:8000/mygitrepo

# Redirects →
https://github.com/Deepanshu072001/Node_Api-Projects



# 📘 GitHub Setup Process (Step-by-Step)

### 1️⃣ Initialize Git

```sh
git init
```

### 2️⃣ Add all project files

```sh
git add .
```

### 3️⃣ Commit changes

```sh
git commit -m "Initial commit - URL shortener project"
```

### 4️⃣ Create new GitHub repository

Go to GitHub → New Repository
Name: **url-shortener-project**

### 5️⃣ Add GitHub remote origin

```sh
git remote add origin https://github.com/your-username/your-repo-name.git
```

### 6️⃣ Push code to GitHub

```sh
git push -u origin main
```

---

# 🎉 Your URL Shortener project is ready!

