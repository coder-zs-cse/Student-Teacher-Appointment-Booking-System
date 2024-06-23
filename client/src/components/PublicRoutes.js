import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoutes(props) {
    if(localStorage.getItem('token')){
        return <Navigate to='/home' />
    }
    else{
        return props.children
    }
}

export {PublicRoutes}