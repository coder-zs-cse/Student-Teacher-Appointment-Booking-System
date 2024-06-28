# Student Teacher 1:1 Appointment Booking System

#### Frontend: React, Redux, Material-UI, Bootstrap

#### Backend: Node.js, Express.js

#### Database: MongoDB

#### Other Tools: npm, yarn (package managers), Git (version control)


## Getting Started

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



# Demonstration of UI
### Sign up page 
![Screenshot (1462)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/b43cec15-cbbc-4011-91a2-4da9e5b5b6d3)
### Sign up page with role of teacher
![Screenshot (1464)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/b4c3d000-2c48-4615-b9d7-881d0d02263f)
### Log in page
![Screenshot (1463)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/ac883594-5725-4739-8fe6-8ecea0d69fd2)
### List of Teachers
![Screenshot (1466)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/f2a82974-1fd6-4b01-9353-2f776959e063)
### Booking Appointment
![Screenshot (1467)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/173efd16-75c2-4537-9975-4427c0ec4e23)
### Validation of Appointment if there is a clash
![Screenshot (1475)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/d2e99597-3ff5-492f-95c8-250cd6665500)
### Viewing state of Appointment
![Screenshot (1469)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/83d071e4-9d97-45f0-83ba-d2136cf54dee)
### Profile of teacher
![Screenshot (1471)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/96fcff13-c65d-498b-a3bd-30c4fd433bf8)
### Appointments from teacher perspective
![Screenshot (1472)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/71899ac0-e8dd-4cf2-bfc4-751504826a8f)
### Using Checkboxes to filter pending booking status 
![Screenshot (1473)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/1ce33dfd-c282-4fb7-9309-9358e2c4b146)
### Upcoming appointment in user home page
![Screenshot (1474)](https://github.com/coder-zs-cse/Student-Teacher-Appointment-Booking-System/assets/75170293/c0a75d35-a6bd-484b-b327-ba14b5518c89)


