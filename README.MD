# 🔐 MERN Authentication & Authorization System

A production-oriented authentication and authorization system built with the MERN stack.

This project demonstrates modern backend architecture, secure authentication practices, role-based authorization, password recovery through email, and HTTP-only cookie authentication.

---

# 🚀 Features

## ✅ Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Access Token Authentication
- Refresh Token Authentication
- HTTP-only Cookie Authentication
- Protected Routes
- Forgot Password
- Reset Password
- Logout
- Refresh Access Token

---

## ✅ Authorization

- Role-Based Access Control (RBAC)
- User Role
- Admin Role
- Authorization Middleware
- Protected Admin Routes

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT Access Tokens
- JWT Refresh Tokens
- HTTP-only Cookies
- Secure Password Reset Tokens
- SHA-256 Hashed Reset Tokens
- Token Expiration
- Protected API Endpoints
- Cookie-based Authentication

---

# 🏗 Project Architecture

```
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models
   │
   ▼
MongoDB
```

The backend follows a layered architecture by separating routing, controllers, business logic, models, middleware, and utilities.

---

# 📂 Folder Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── authorize.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── services/
│   └── authServices.js
│
├── utils/
│   ├── tokenUtils.js
│   └── sendEmail.js
│
├── app.js
├── server.js
└── .env

frontend/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── ForgotPassword.jsx
│   ├── ResetPassword.jsx
│   └── Admin.jsx
│
├── components/
│   └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🗄 User Schema

```javascript
{
  name,
  email,
  password,
  role,
  refreshToken,
  resetPasswordToken,
  resetPasswordExpire
}
```

---

# 🔑 Authentication Flow

```
Register/Login
        │
        ▼
Generate Access Token
Generate Refresh Token
        │
        ▼
Store Tokens in HTTP-only Cookies
        │
        ▼
Browser Sends Cookies Automatically
        │
        ▼
Backend Verifies Token
        │
        ▼
Protected Route Access
```

---

# 🔄 Refresh Token Flow

```
Access Token Expires
        │
        ▼
Browser Calls Refresh Endpoint
        │
        ▼
Refresh Token Verified
        │
        ▼
Generate New Access Token
        │
        ▼
Set New Access Token Cookie
```

---

# 🔐 Password Reset Flow

```
Forgot Password
        │
        ▼
Generate Random Token
        │
        ▼
Hash Token using SHA-256
        │
        ▼
Store Hash in Database
        │
        ▼
Send Reset Link via Email
        │
        ▼
User Opens Link
        │
        ▼
Verify Token
        │
        ▼
Update Password
```

---

# 🛡 Authorization Flow

```
Request
   │
   ▼
Authentication Middleware
   │
   ▼
Verify JWT
   │
   ▼
Attach User to Request
   │
   ▼
Authorization Middleware
   │
   ▼
Check Role
   │
   ▼
Allow / Deny Access
```

---

# 🛠 Technologies Used

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Cookie Parser
- CORS
- dotenv

---

## Frontend

- React
- Vite
- React Router
- Axios

---

# 📌 Current Features

- ✅ User Registration
- ✅ Login
- ✅ Logout
- ✅ JWT Authentication
- ✅ Refresh Token Authentication
- ✅ HTTP-only Cookie Authentication
- ✅ Forgot Password
- ✅ Reset Password
- ✅ Email Integration
- ✅ Protected Routes
- ✅ Role-Based Authorization
- ✅ Admin Routes
- ✅ Service Layer Architecture
- ✅ Controller Layer
- ✅ Utility Layer
- ✅ Middleware Layer

---

# 🚧 Upcoming Features

- Cloudinary File Uploads
- User Profile Image
- Refresh Token Rotation
- Logout From All Devices
- Email Verification
- Account Activation
- Rate Limiting
- API Validation
- Security Headers (Helmet)
- Request Logging
- Docker Support
- Deployment
- CI/CD Pipeline

---

# 🎯 Learning Objectives

This project was built to understand:

- Backend Architecture
- Authentication vs Authorization
- JWT Authentication
- Cookie-Based Authentication
- Role-Based Access Control (RBAC)
- Password Reset Flow
- Secure Token Handling
- Service-Based Architecture
- REST API Development
- Production-Level Backend Practices

---

# 👨‍💻 Author

**Nirbhay Jakhar**

B.Tech Student | Full Stack Developer | MERN Stack Learner | DSA Enthusiast

Currently building production-ready backend systems while learning system design, authentication, authorization, and scalable web application architecture.