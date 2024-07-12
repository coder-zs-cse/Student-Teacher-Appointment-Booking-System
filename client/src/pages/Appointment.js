import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Table, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const UserAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filters, setFilters] = useState({
    all: true,
    accepted: false,
    rejected: false,
    pending: false,
  });

  useEffect(() => {
    // Fetch appointments from your API
      fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, filters]);

  const fetchAppointments = async () => {
    // Replace this with your actual API call

    try {
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
    } catch (error) {
      setIsLoading(false);
      // console.log("SOmething wrong in fetchAppointments");
    }
  };

  const filterAppointments = () => {
    if (filters.all) {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(
          (appointment) =>
            (filters.accepted && appointment.status === "accepted") ||
            (filters.rejected && appointment.status === "rejected") ||
            (filters.pending && appointment.status === "pending")
        )
      );
    }
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (name === "all" && checked) {
      setFilters({
        all: true,
        accepted: false,
        rejected: false,
        pending: false,
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: checked,
        all: false,
      }));
    }
  };
  const deleteAppointment = async(id)=>{

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/delete-appointment/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id}),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const responseData = await response.json();
      // console.log("data inside handleAction of appointments", responseData);
      fetchAppointments(); // Refresh the appointments list
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.log("Some server error in handleaction of appointment");
    }
  };
  const handleAction = async (id, action) => {
    // Replace this with your actual API call
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/update-appointment/${id}`, {
        method: "PUT",
        body: JSON.stringify({ _id: id, status: action }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const responseData = await response.json();
      // console.log("data inside handleAction of appointments", responseData);
      fetchAppointments(); // Refresh the appointments list
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.log("Some server error in handleaction of appointment");
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <h2>My Appointments</h2>

          <Form className="mb-3">
            <div className="d-flex">
              {Object.keys(filters).map((filter) => (
                <Form.Check
                  key={filter}
                  type="checkbox"
                  id={`filter-${filter}`}
                  label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                  name={filter}
                  checked={filters[filter]}
                  onChange={handleFilterChange}
                  className="me-3"
                />
              ))}
            </div>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.teacherID.name}</td>
                  <td>
                    {dayjs(appointment.scheduleDateTime).format(
                      "MMMM D, YYYY h:mm A"
                    )}
                  </td>
                  <td>{appointment.status}</td>
                  <td>
                    {((appointment.status === "accepted" ||
                      appointment.status === "pending") && (
                      <>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleAction(appointment._id, "cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )) || (
                      <div>
                        <i
                          class="ri-delete-bin-line ml-auto"
                          onClick={() => {
                            deleteAppointment(appointment._id);
                          }}
                          style={{ float: "right" }}
                        ></i>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Layout>
  );
};

export default UserAppointment;




