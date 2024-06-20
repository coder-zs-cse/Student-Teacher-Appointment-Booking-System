import React from 'react'
import '../layout.css'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'
function Layout({children}) {
    const userMenu = [
        {
            name: "Home",
            path: '/home',
            icon: 'ri-home-line mt-auto mb-auto'
        },
        {
            name: 'Appointments',
            path: '/appointment',
            icon: 'ri-file-list-line mt-auto mb-auto'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: "ri-user-line mt-auto mb-auto"
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-logout-box-r-line mt-auto mb-auto'
        },
        
    ]

    const menuToBeRendered = userMenu
  return (

    
    <div className="main vh-100 p-3">
    <div className="d-flex h-100">
        <div className="sidebar text-white bg-primary rounded me-3 p-3" style={{ width: '300px', boxShadow: '0 0 2px gray' }}>
            <div className='sidebar-header pb-2'>
                Menu Items
            </div>
            <div className='menu text-white mt-5'>
                {menuToBeRendered.map((menuItem)=>{
                    return (
                        <div className='d-flex' >
                            <i class={menuItem.icon}></i>
                            <Link to={menuItem.path} className='text-white ms-2 text-decoration-none mb-3 mt-3'>{menuItem.name}</Link>
                        </div>
                    )
                })}

            </div>
        </div>
        <div className="content bg-light rounded w-100">
            <div className="header bg-black text-white d-flex justify-content-center align-items-center" style={{ height: '7vh' }}>
                Book 1:1 Personalized Session
            </div>
            <div className="body w-100">
                {children}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Layout