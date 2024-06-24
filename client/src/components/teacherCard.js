import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const TeacherCard = ({ teacher }) => {
    const navigate = useNavigate()
  // Destructure teacher data
  //   const { image, name, speciality, fees } = teacher;
  const { id, name, speciality } = teacher;


  function handleBookNow(){
    // // console.log("clicked");
    navigate(`/teacher/book-appointment/${id}`)
  }
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          variant="top"
          src="./assets/teacherDP.png"
          alt={name}
          fluid
          style={{ objectFit: "cover", width: "50%" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Speciality: {speciality}</Card.Text>
        {/* <Card.Text>Fees: {fees}</Card.Text> */}
        <div  style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary" onClick={handleBookNow}>Book Now</Button>

        </div>
      </Card.Body>
    </Card>
  );
};

export default TeacherCard;
