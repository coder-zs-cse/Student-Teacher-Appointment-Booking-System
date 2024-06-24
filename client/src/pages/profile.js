import React from 'react'
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';

function Profile() {
    const {user} = useSelector((state)=>state.user)
    // console.log(user);
  return (
    <Layout>
       <div className="profile-container card shadow-sm">
      <div className="card-body">
        <h2>Profile Details</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Name:</b> {user?.name}
          </li>
          <li className="list-group-item">
            <b>Email:</b> {user?.email}
          </li>
          {user?.speciality && (
            <li className="list-group-item">
              <b>Speciality: </b> {user?.speciality}
            </li>
          )}
        </ul>
      </div>
    </div>
    </Layout>
  )
}

export default Profile