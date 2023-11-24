# Online Todo Management System

## Overview

The Online Todo Management System is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to sign up, log in, manage todos, and mark them as done. The backend provides secure authentication using JSON Web Tokens (JWT), and todos are stored in a MongoDB database.

## Features

- **Authentication**: Users can sign up and log in securely. JWT is used for authentication.
  
- **Todo Management**: Users can add new todos, view their todo list, and mark todos as done.

- **Responsive UI**: The frontend, built with React, provides a responsive and user-friendly interface.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: Recoil (for managing global state)

## Project Structure

- **`/server`**: Backend server code.
- **`/client`**: Frontend React application.
- **`/middleware`**: Middleware functions for authentication.
- **`/db`**: MongoDB models for User and Todo.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/online-todo-management.git

2. **Install dependencies**

   ```bash
   cd online-todo-management
   npm install
   cd client
   npm install

3. **Setup MongoDB**
    - Create a MongoDB database.
    - Update the MongoDB connection string in server/app.js and server/routes/todo.js.
    
4. **Start the server**
   ```bash
   cd server
   npm start
   
5. **Start the Frontend**
   ```bash
   cd client
   npm start

6. **Open the application in your browser
   - http://localhost:3000

## API Endpoints

- **`POST /auth/signup`**: Sign up a new user.
- **`POST /auth/login`**: Log in an existing user.
- **`GET /auth/me`**: Get details of the currently logged-in user.
- **`POST /todo/todos`**: Add a new todo.
- **`GET /todo/todos`**: Get all todos for the logged-in user.
- **`PATCH /todo/todos/:todoId/done`**: Mark a todo as done.

## Contributions

Contributions are welcome! If you find a bug or want to add new features, please open an issue or submit a pull request.

   
