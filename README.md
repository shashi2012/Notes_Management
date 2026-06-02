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

## 📈 Scalability & Future Readiness

To ensure the application remains highly performant and reliable as the user base grows, the following scaling strategies are recommended for future iterations:

- **⚡ Caching Layer (Redis):** Implement Redis to cache frequently accessed data, such as user profiles or read-heavy note queries. This significantly reduces direct queries to the MongoDB database and improves API response times.
- **⚖️ Horizontal Scaling & Load Balancing:** Deploy multiple instances of the Node.js backend using process managers like PM2 or container orchestration (Kubernetes). An NGINX reverse proxy or AWS Application Load Balancer (ALB) can distribute incoming API traffic evenly across instances.
- **🏗️ Microservices Architecture:** As the platform expands, the monolithic architecture can be decoupled into independent microservices (e.g., an `Auth Service` and a `Notes Service`). This allows specific modules to scale independently based on unique traffic demands.
- **🗄️ Database Optimization:** Introduce strict database indexing on frequently queried fields (like `userId` and `role`) and enforce pagination/limiters on all GET requests to prevent memory overload when handling massive datasets.
- **🐳 Containerization & Deployment:** Dockerize both the frontend and backend applications to ensure consistent environments across development, testing, and production. This sets the foundation for automated CI/CD pipelines and seamless cloud scaling.

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

