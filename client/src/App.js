import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Button } from "antd";
import { Login } from "./pages/login.js";
import { Register } from "./pages/register.js";
import { Home } from "./pages/home.js";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoutes.js";
import { PublicRoutes } from "./components/PublicRoutes.js";
import BookAppointment from "./pages/bookAppointment.js";
import BookingPage from "./pages/bookingPage.js";
import TeacherAppointments from "./pages/teacher/Appointments.js";
import UserAppointment from "./pages/Appointment.js";
import Profile from "./pages/profile.js";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-appointments"
            element={
              <ProtectedRoute>
                <UserAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/appointments"
            element={
              <ProtectedRoute>
                <TeacherAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher/book-appointment/:teacherID"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
