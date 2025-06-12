import React from 'react'
import '../css/admin-account.css'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { Session } from '../providers/SessionProvider'

function Admin() {

    const {
        userIdentity,
        principalId,
        userData
    } = Session()

    return (

    <>
        
	{userIdentity && principalId && userData ? (
        <div className="admin-sidebar">

            <AdminSidebar />

            <div className="admin-content">

                <Outlet />

            </div>

        </div>
	):(
		<div className="loading-input fadeInLoader"><i className='bx bx-loader-circle bx-spin' ></i></div>
	)} 

    </>

    )

}

export default Admin