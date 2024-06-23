import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import React from "react";
import { useEffect, useState } from "react";
import TeacherCard from "../components/teacherCard";

function BookAppointment() {
  const [teachersList, setTeachersList] = useState([]);
  const navigate = useNavigate();

  const getTeachersList = async () => {
    try {
      const responseData = await fetch("/api/v1/user/book-appointment", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await responseData.json();
      if (data.success) {
        console.log("mydata: ", data.data);
        setTeachersList(data.data);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };
  useEffect(() => {
    getTeachersList();
  }, []);

  return (
    <Layout>
      BookAppointment are{" "}
      {teachersList.length > 0 && (
        <div className="d-flex flex-wrap ">
          {teachersList.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}

    </Layout>
  );
}

export default BookAppointment;
