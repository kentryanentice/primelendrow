import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../css/admin-sidebar.css'
import { Session } from '../providers/SessionProvider'

function AdminSidebar() {
    
    const {
        userIdentity,
        principalId,
        userData,
        location
    } = Session()

    const [navigation, setOpenNavigation] = useState(false)
    const [activeList, setActiveList] = useState(null)

    useEffect(() => {
        switch (location.pathname) {
            case "/admin-accounts":
                setActiveList(1)
                break
            case "/admin-vault":
                setActiveList(2)
                break
            case "/admin-lenders":
                setActiveList(3)
                break
            case "/admin-borrowers":
                setActiveList(4)
                break
            case "/admin-payments":
                setActiveList(5)
                break
            case "/admin-profile":
                setActiveList(null)
                break
            default:
                setActiveList(1)
                break
        }
    }, [location.pathname])

    return (
        <>
        
            <div className="primelendrow-profile fadeInSidebar"><p>PRIME LENDROW</p></div>

            <div className="admin-picture fadeInSidebar">
                <div className="admin-profile">
                    <Link to="/admin-profile" draggable="false">
                        <img src={userData?.picture || "pictures/logo.png"} alt="Profile" />
                    </Link>
                </div> 
            </div>

            <div className="admin-name fadeInSidebar">
                Welcome! <br/>{userData?.email?.split('@')[0] || userData?.username?.split('@')[0] || "primelendrow User"}
                {userData.userType === 'Admin' && userData.userLevel === 'L100' && userData.userBadge === 'Verified'  &&  <div className="admin-icon">
                    <i className='bx bxs-check-circle'></i><p className='admin-badge'>Verified Admin</p>
                </div>}
            </div>


            <div className={`menu fadeInSidebar ${navigation ? "active" : ""}`} onClick={() => setOpenNavigation(!navigation)}>
            </div>

            <div className={`navigation fadeInSidebar ${navigation ? "open" : ""}`}>

                <li className={`list ${activeList === 1 ? "active" : ""}`}>
                    <Link to="/admin-accounts" className="icon" onClick={() => setActiveList(1)} draggable="false"><i className='bx bx-grid-alt'></i></Link>
                    <span className="text">Accounts</span>    
                </li>

                <li className={`list ${activeList === 2 ? "active" : ""}`}>
                    <Link to="/admin-vault" className="icon" onClick={() => setActiveList(2)} draggable="false"><i className='bx bx-slider-alt'></i></Link>
                    <span className="text">Vault</span>
                </li>

                <li className={`list ${activeList === 3 ? "active" : ""}`}>
                    <Link to="/admin-lenders" className="icon" onClick={() => setActiveList(3)} draggable="false"><i className='bx bx-layer-plus'></i></Link>
                    <span className="text">Lend</span>
                </li>
                
                <li className={`list ${activeList === 4 ? "active" : ""}`}>
                    <Link to="/admin-borrowers" className="icon" onClick={() => setActiveList(4)} draggable="false"><i className='bx bx-layer-minus'></i></Link>
                    <span className="text">Borrow</span>
                </li>
                
                <li className={`list ${activeList === 5 ? "active" : ""}`}>
                    <Link to="/admin-payments" className="icon" onClick={() => setActiveList(5)} draggable="false"><i className='bx bx-credit-card'></i></Link>
                    <span className="text">Pay</span>
                </li>


            </div>
        
        </>
    )
}

export default AdminSidebar