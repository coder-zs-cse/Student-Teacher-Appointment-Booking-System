import React from 'react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="teacher-card">
      <h2>{teacher.name}</h2>
      <p>Specialty: {teacher.specialty}</p>
      {/* Add more details as needed */}
    </div>
  );
};

const TeacherList = ({ teachers }) => {
  return (
    <div className="teacher-list">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
};

export default TeacherList;