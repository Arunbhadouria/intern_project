# Task Management System - Backend Intern Project

A professional, production-ready full-stack Task Management System built with the MERN stack.

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB/Mongoose
- **Frontend:** React.js, Tailwind CSS, Framer Motion, Lucide-React
- **Security:** JWT, Bcrypt, Helmet, CORS, Rate Limiting
- **Documentation:** Swagger UI

## Features
- **Authentication:** Secure Register/Login with JWT.
- **RBAC:** User and Admin roles. Only Admins can delete tasks.
- **CRUD:** Complete Task management with title, description, priority, and status.
- **UI:** Responsive, modern design with glassmorphism effects and animations.
- **Validation:** Server-side input validation using `express-validator`.
- **API Docs:** Integrated Swagger UI for interactive API exploration.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or a cloud instance)

### 1. Clone & Install
```bash
# Clone the repository
git clone <repo-url>
cd backend_intern

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/backend_intern
JWT_SECRET=supersecretkey123
JWT_EXPIRE=24h
NODE_ENV=development
```

### 3. Run Locally
```bash
# From the backend directory
npm start # or npm run dev if nodemon is configured

# From the frontend directory
npm run dev
```

### 4. API Documentation
Once the server is running, visit:
`http://localhost:5000/api/docs`

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Create a new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user profile (Protected)

### Tasks
- `GET /api/v1/tasks` - Get all tasks (User's tasks or all if Admin)
- `POST /api/v1/tasks` - Create a new task (Protected)
- `GET /api/v1/tasks/:id` - Get task details (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected, Owner or Admin)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected, Admin Only)

## Scalability
See [SCALABILITY.md](./SCALABILITY.md) for detailed notes on scaling this application.
