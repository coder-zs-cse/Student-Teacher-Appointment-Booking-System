import react, { useEffect } from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
function Home() {
  const [appointments, setAppointments] = useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null);
  const fetchAppointments = async () => {
    // Replace this with your actual API call

    try {
      // console.log("this is the role", user?.role);
      if (user) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        // console.log("Appointments", data);
        
        setAppointments(data);
        setIsLoading(false);
        setError(false);
      }
    } catch (error) {
      // console.log("Something wrong in fetchAppointments");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if(!appointments){
      fetchAppointments();

    }
  }, [user]);
  const handleBookSession = () => {
    // Handle book session logic (redirect to booking page, etc.)
    navigate("/book-appointment");
    // console.log("Book 1:1 session clicked");
  };

  function upcomingAppointmentExists(appointments){
    if(!appointments) return false
    const nextAppointment = appointments.find(
      (appointment) => appointment.status === "accepted"
    ); // Assuming appointments are sorted by date
    return nextAppointment
  }
  function UpcomingAppointment({ appointments }) {
    // Display the details of the next upcoming appointment here
    // (adjust logic based on your appointment data structure)
    const nextAppointment = appointments.find(
      (appointment) => appointment.status === "accepted"
    ); // Assuming appointments are sorted by date
    // console.log("app: ", nextAppointment);
    return (
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">Upcoming Appointment</h5>
          <p className="card-text">
            {/* Display appointment details here */}
            Date:{" "}
            {dayjs(nextAppointment?.scheduleDateTime).format(
              "MMMM D, YYYY"
            )}{" "}
            <br />
            Time: {dayjs(nextAppointment?.scheduleDateTime).format("hh:mm A")}
            <br />
            {user?.role === "teacher" ? (
              <>Student Name: {nextAppointment?.studentID.name}</>
            ) : (
              <>Teacher Name: {nextAppointment?.teacherID.name}</>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container">
        {isLoading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> 
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error fetching appointments: {error.message}
          </div>
        ) : !upcomingAppointmentExists(appointments) ? (
          <div className="text-center mt-5">
            <p className="h3">You have no confirmed appointments.</p>
          </div>
        ) : (
          <UpcomingAppointment appointments={appointments} />
        )}
        {user?.role ===
          "student" ? (
            <button
              type="button"
              className="btn btn-primary btn-lg mt-5"
              onClick={handleBookSession}
            >
              Book 1:1 Session Now
            </button>
          ) : (<></>)}
      </div>
    </Layout>
  );
}

export { Home };
