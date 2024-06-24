# Student Teacher 1:1 Appointment Booking System

#### Frontend: React, Redux, Material-UI, Bootstrap

#### Backend: Node.js, Express.js

#### Database: MongoDB

#### Other Tools: npm, yarn (package managers), Git (version control)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 1. Cloning the Repository

```bash
git clone https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System.git
cd Student-Teacher-Appointment-Booking-System
```

#### We would require two terminals. One for frontend and one for backend.

### 2. Setting up the Backend


Rename the .env-sample file to .env:

Open the .env file and replace the placeholder values:
```bash
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET_KEY=your_jwt_secret_key_here
```
Install the dependencies:
```bash
npm install
```

### 3. Start the backend server:
```bash
nodemon server
```
The server should now be running on http://localhost:5000.

### 4. Setting up the Frontend
In a second terminal, navigate to the client directory:
```bash
cd client
```

Install the dependencies:
```bash
npm install
# or
yarn install (recommended for maximum library dependency resolution)
```

### 5. Start the frontend development server:
```bash
npm start
# or
yarn start
```
The frontend should now be running on http://localhost:3000.

### Cool, now open your web browser and navigate to `http://localhost:3000/register` to access the application.
