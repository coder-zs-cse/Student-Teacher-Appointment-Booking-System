import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import React from "react";
import { useEffect, useState } from "react";
import TeacherCard from "../components/teacherCard";

function BookAppointment() {
  const [teachersList, setTeachersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const navigate = useNavigate();

  const getTeachersList = async () => {
    try {
      const responseData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/book-appointment`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await responseData.json();
      if (data.success) {
        setIsLoading(false);
        // console.log("mydata: ", data.data);
        setTeachersList(data.data);
      } else {
        setIsLoading(false);
        navigate("/home");
      }
    } catch (error) {
      setIsLoading(false);
      navigate("/");
    }
  };
  useEffect(() => {
    getTeachersList();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        teachersList.length == 0 ? (
          <div className="text-center mt-5">
            <p className="h3">Currently no teachers are available on this platform </p>
          </div>
        ): 
         (
          <div className="d-flex flex-wrap ">
            {teachersList.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )
      )}
    </Layout>
  );
}

export default BookAppointment;
