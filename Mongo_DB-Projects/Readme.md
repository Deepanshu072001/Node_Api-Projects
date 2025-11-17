# 🚀 User Authentication API  
### Node.js + Express + MongoDB + JWT

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-blue?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-ISC-purple)
![Status](https://img.shields.io/badge/Status-Active-success)

A clean, simple, and secure **User Authentication System** built using  
**Node.js**, **Express**, **JWT**, and **MongoDB**.  
Includes signup, login, profile fetch, and update user functionalities.

---

## 🚀 Features

- User Signup  
- User Login  
- JWT Authentication  
- Get Logged-in User Profile  
- Update User Profile (PATCH)  
- Secure Routes with Custom Middleware 


## 📁 Project Structure

```
project/
│── index.js
│── connection.js
│── package.json
│── .env
│
├── middlewares/
│   └── auth.middleware.js
│
├── routes/
│   └── user.route.js
│
└── models/
    └── user.model.js
```

---

# 📦 Installed Dependencies

| Package | Version | Description |
|--------|---------|-------------|
| express | 4.21.2 | Web server framework |
| mongoose | 8.19.3 | MongoDB ORM |
| jsonwebtoken | 9.0.2 | Token authentication |
| dotenv | 17.2.3 | Environment variables |

### Dev Dependencies

| Package | Version | Description |
|--------|---------|-------------|
| @types/express | 4.17.25 | Express type definitions |
| @types/node | 24.10.1 | Node.js types |

---

# ⚙️ Environment Setup

Create a `.env` file in the project root:

```
PORT=<your port number>
MONGODB_URL=mongodb://localhost:<port-number>/<your_database_name>
JWT_SECRET_TOKEN=your_secret_key
```

---

# 🛠️ Installation

### 1️⃣ Clone the repository
```sh
git clone <your-repo-url>
cd mongo_db-projects
```

### 2️⃣ Install dependencies (using pnpm)
```sh
pnpm install
```

OR using npm:
```sh
npm install
```

### 3️⃣ Start the development server
```sh
pnpm dev
```

Server starts at:
```
http://localhost:8000
```

---

# 🔐 Authentication Flow (JWT)

1. User signs up  
2. User logs in  
3. Server returns a **JWT token**  
4. Client includes token in header:
```
Authorization: Bearer <token>
```
5. Protected routes become accessible

---

# 📌 API Endpoints

Base URL:
```
http://localhost:8000
```

---

# 🔹 1. Signup User  
### **POST /user/signup**

#### Request Body:
```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

#### Response:
```json
{
  "status": "success",
  "data": { "id": "67890abcd" }
}
```

---

# 🔹 2. Login User  
### **POST /user/login**

#### Request Body:
```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

#### Response:
```json
{
  "status": "success",
  "token": "eyJhbGci..."
}
```

---

# 🔹 3. Get User Profile (Protected)  
### **GET /user**

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "status": "success",
  "data": {
    "_id": "123",
    "name": "John",
    "email": "john@gmail.com"
  }
}
```

---

# 🔹 4. Update User Name (Protected)  
### **PATCH /user**

#### Headers:
```
Authorization: Bearer <token>
Content-Type: application/json
```

#### Request Body:
```json
{
  "name": "Updated Name"
}
```

#### Response:
```json
{
  "status": "success"
}
```

---

# 🧪 Test the API Using Postman

1. Signup → receive User ID  
2. Login → receive token  
3. For protected routes, add header:

```
Authorization: Bearer <your_jwt_token>
```

---

# 🏆 Future Improvements

- Refresh tokens  
- Forgot password / reset password  
- Role-based authentication (admin, user)  
- Account deletion  
- Email verification  

---

# 📜 License  
This project is licensed under the **ISC License**.

---

# 👨‍💻 Author  
Your Name : Deepanshu 