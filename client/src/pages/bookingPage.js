import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const BookingPage = () => {
  const params = useParams();
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user);
  const [teacher,setTeacher]  = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([
    {
      date: "2024-06-24",
      time: "14:30",
    },
  ]);
  const [availableSlots, setAvailableSlots] = useState([]); // Stores available slots for selected date
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const data = { teacherID: params.doctorID };
  // Fetch available slots on component mount or date change
  useEffect(() => {
    
    async function fetchData() {
      console.log("data to send",data)
      try {
        const response = await fetch("/api/user/get-teacher-by-id", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ localStorage.getItem('token')
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log("this data", responseData);
        setTeacher(responseData.data)
        
      } catch (error) {
        console.log("some error inside useeffeect of booking page");
      }
    }
    if (!teacher) {
      fetchData();
    }
  }, []);

  // const fetchAvailableSlots = async () => {
  //   setIsLoading(true);
  //   // Simulate API call to fetcnh available slots based on teacher and date
  //   const response = await fetch(`/api/slots?teacherId=${teacher.id}&date=${selectedDate.toISOString()}`);
  //   const data = await response.json();
  //   setAvailableSlots(data.availableSlots);
  //   setIsLoading(false);

  // };

  // if (selectedDate) {
  //   fetchAvailableSlots();
  // }

  const handleSubmitBooking = async (event) => {
    event.preventDefault();
    if (!selectedDateTime) {
      alert("Please select a date and time.");
      return;
    }

    // Extract date and time from the selectedDate
    const bookingDate = selectedDateTime.format("YYYY-MM-DD").toString();
    const bookingTime = selectedDateTime.format("HH:mm").toString();

    console.log(bookingDate, bookingTime);
    // Create a booking object
    const bookingData = {
      studentID: user?.id,
      teacherID: teacher?.id, // Assuming teacher object exists and has an id
      date: bookingDate,
      time: bookingTime,
      // Add any other relevant booking information
    };
    console.log(bookingData);
    try {
      const response = await fetch('/api/user/doctor/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json()
      console.log(responseData);
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to book appointment');
      // }

      // const result = await response.json();
      // return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

    // const isDateClashing = bookedAppointments.some(appointment => {
    //   return appointment.date ===  bookingDate && appointment.time === bookingTime
    // }
    // );
    // if(isDateClashing){
    //   toast.error("This slot is filled. Please choose another slot")
    //   return
    // }

    // Simulate API call to book the slot
    // const response = await fetch(`/api/bookings`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ teacherId: teacher.id, date: selectedDate.toISOString(), time: selectedTime }),
    // });

    // if (response.ok) {
    //   alert('Booking successful!');
    //   // Handle successful booking (e.g., clear form, show confirmation message)
    // } else {
    //   alert('Booking failed. Please try again.');
    // }
  };

  return (
    <Layout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="booking-page">
          {/* Teacher details section */}
          <div className="teacher-details">
            <h2>{teacher?.name}</h2>
            <p>Speciality: {teacher?.speciality}</p>
            <p>Fees: {teacher?.fees}</p>
          </div>

          {/* Booking form section */}
          <form onSubmit={handleSubmitBooking}>
            <div className="date-time-picker">
              <DateTimePicker
                label="Choose Date/Time"
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue)}
                minutesStep={30}
                minTime={dayjs().set("hour", 9).startOf("hour")}
                maxTime={dayjs().set("hour", 17).startOf("hour")}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              Book Now
            </button>
          </form>
        </div>
      </LocalizationProvider>
    </Layout>
  );
};

export default BookingPage;
