# 🔐 Full Stack Authentication System

A complete authentication system built using:

* React.js (Frontend)
* Node.js + Express.js (Backend)
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer (Forgot Password Email)

This project includes:

✅ Register
✅ Login
✅ JWT Token Authentication
✅ Protected Routes
✅ Logout
✅ Forgot Password
✅ Reset Password
✅ Email Sending using Nodemailer

---

# 🚀 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* crypto
* Nodemailer
* dotenv
* cors

---

# 📁 Folder Structure

## Frontend

```bash
frontend/
│
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
```

---

## Backend

```bash
backend/
│
├── src/
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   └── sendEmail.js
│
├── .env
├── app.js
├── server.js
```

---

# ⚙️ Environment Variables

Create a `.env` file inside backend folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_google_app_password
```

---

# 📦 Installation

## 1️⃣ Clone Repository

```bash
git clone <your_repo_link>
```

---

# 🖥️ Backend Setup

## Install Dependencies

```bash
npm install
```

## Run Backend

```bash
npm run dev
```

OR

```bash
node server.js
```

---

# 🌐 Frontend Setup

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

---

# 🔐 Features

## ✅ Register

Users can:

* Create account
* Store encrypted password using bcrypt
* Receive JWT token

---

## ✅ Login

Users can:

* Login using email and password
* Receive JWT token
* Store token in localStorage

---

## ✅ Protected Routes

Dashboard route is protected.

Without token:

* User is redirected to Login page.

With token:

* Dashboard access allowed.

---

## ✅ Forgot Password

User enters registered email.

Backend:

* Generates reset token
* Sends email using Nodemailer

---

## ✅ Reset Password

User clicks reset link from email.

User can:

* Enter new password
* Reset account password successfully

---

# 🔑 Authentication Flow

## Register

```bash
User → Register → JWT Token Generated
```

## Login

```bash
User → Login → Token Stored in localStorage
```

## Protected Route

```bash
Token Exists → Access Granted
No Token → Redirect to Login
```

## Forgot Password

```bash
Email → Token Generated → Email Sent
```

## Reset Password

```bash
Reset Link → New Password → Password Updated
```

---

# 📮 API Routes

## Auth Routes

| Method | Route                           | Description      |
| ------ | ------------------------------- | ---------------- |
| POST   | /api/auth/register              | Register User    |
| POST   | /api/auth/login                 | Login User       |
| POST   | /api/auth/forgot-password       | Send Reset Email |
| POST   | /api/auth/reset-password/:token | Reset Password   |

---

# 🧠 Concepts Learned

* React Forms
* React State Management
* React Router
* useNavigate
* useParams
* Axios API Calls
* JWT Authentication
* Password Hashing
* MongoDB + Mongoose
* Protected Routes
* Nodemailer Email Sending
* Reset Password Flow

---

# 🔥 Future Improvements

* Better UI Design
* Context API Authentication
* Cookie-based Authentication
* Refresh Tokens
* Email Templates
* Loading States
* Form Validation
* Toast Notifications
* User Profile
* Deployment

---

# 👨‍💻 Author

Built by Nirbhay Jakhar 🚀
