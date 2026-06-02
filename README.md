# 📝 Role-Based Notes Management System

A scalable Full-Stack application featuring a robust REST API and a modern React frontend. Built to demonstrate secure authentication, role-based access control (RBAC), and CRUD operations.

## 🚀 Features

- **Authentication & Security:** Secure JWT-based login and registration with bcrypt password hashing.
- **Role-Based Access Control (RBAC):** - **User:** Can seamlessly create, read, update, and delete their personal notes.
- **Admin Command Center:** Admins can view all system notes, force-delete any note, and manage users.
- **Robust Backend:** Includes API versioning (`/api/v1/`), central error handling, and scalable folder architecture.
- **Modern UI:** Fast and responsive frontend built with React (Vite) and Tailwind CSS v4.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router
- **Tools:** Postman (API Testing)

## ⚙️ Local Setup & Installation

## .env

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=secret_key
- NODE_ENV=development

## Backend Setup
- cd server
- npm install

## Start the backend server
npm run dev

## Frontend Setup
- cd client
- npm install
- npm run dev

