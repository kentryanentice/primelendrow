import React from 'react'
import '../css/admin-profile.css'
import { Session } from '../providers/SessionProvider'
import AdminProfileFunctions from '../functions/AdminProfileFunctions'

function AdminProfile() {

	const {
		userIdentity,
        principalId,
        userData
	} = Session()

	const {
		navigate,
        showSignOut,
        setShowSignOut,
        signOut,
        cancelSignOut,
        isSigningOut,
        setIsSigningOut,
        showPrimaryID,
        setShowPrimaryID,
        showID,
        hideID,
        isUpdateFormDefault,
        setIsUpdateFormDefault,
        updateFormError,
        setUpdateFormError,
        updateFormSuccess,
        setUpdateFormSuccess,
        isUpdating,
        setIsUpdating,
        handleSignOut
	} = AdminProfileFunctions()

    return (
        <>

        <div className={`overlay-bg ${showPrimaryID ? "active" : ""}`}></div>

		<div className={`overlay-bg ${showSignOut ? "active" : ""}`}></div>

        <div className="admin-signout fadeInContent" onClick={signOut}>Sign Out</div>

		<div className={`signout-form ${showSignOut ? "active" : ""}`}>
			<h2>Sign Out Form</h2>
						
			<p>Are you sure you want to Sign Out?</p>
							
			<div className="buttons">
				<div className="close" onClick={cancelSignOut}>Cancel</div>
				<div className="confirm" onClick={handleSignOut} disabled={isSigningOut}>{isSigningOut ? ('Signing Out') : ('Confirm')}</div>
			</div>
		</div>

        <div className="admin-profile-picture fadeInContent">
			<div className="admin-profile">
                <img src={userData?.picture || "pictures/logo.png"} alt="Profile" />
			</div>
				<div className="admin-edit-profile" >Edit</div>
		</div>	

        <div className="admin-info fadeInContent">
        	<div className="admin-profile-info">
				<h2>Profile Information</h2>
			<div>
						
				<div className="admin-primary-ids">
						
				<span className="admin-id-text">Primary ID</span>
                
				<div className="admin-primary-id" onClick={showID}>
					<img src={userData?.primaryId || "pictures/logo.png"} alt="Primary ID" />
				</div>

				{userData?.userType === 'Admin' && userData?.userLevel === '100' && userData?.userBadge === 'Verified'  && <div className="admin-status">
					<i className='bx bxs-check-circle'></i><p className='admin-verified'>Verified Account</p>
				</div>}
						
				</div>
						
				<div className="inputBox">
					<div className="inputOverlay"></div>
					<i className='bx bxs-user-rectangle' ></i>
					<input type="text" placeholder="No Fullname"
          			value={((userData?.firstName || "") + " " + (userData?.middleName || "") + " " + (userData?.lastName || "")).trim() || "" } disabled />
				</div>

				<div className="inputBox">
					<div className="inputOverlay"></div>
					<i className='bx bxs-user'></i>
					<input type="text" placeholder="No Username" value={userData?.username?.split('@')[0] || ""} disabled />
				</div>

				<div className="inputBox">
					<div className="inputOverlay"></div>
					<i className='bx bxs-phone'></i>
					<input type="text" placeholder="No Mobile No." value={userData?.mobile || ""} disabled />
				</div>


			</div>

				
				<div className="admin-update">Verified</div>
			
			</div>
		</div>

            <div className={`admin-id ${showPrimaryID ? "active" : ""}`}>
				<div className="admin-title">Primary ID<i className='bx bxs-message-square-x' onClick={hideID}></i></div>
              	<img src={userData?.primaryId || "pictures/logo.png"} alt="Primary ID" />
			</div>

        </>
    )
}

export default AdminProfile