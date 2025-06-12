import React from 'react'
import '../css/pending.css'
import { Session } from '../providers/SessionProvider'
import PendingFunctions from '../functions/PendingFunctions'

function Pending() {

    const {
		userIdentity,
        principalId,
        userData
	} = Session()

    const {
		navigate,
		showSignOut,
		signOut,
		cancelSignOut,
		handleSignOut,
		isSigningOut,
		showPrimaryID,
		showID,
		hideID,
		showUpdateForm,
		setShowUpdateForm,
		showUpdate,
		hideUpdate,
		formData,
		setFormData,
		errors,
		setErrors,
		fileInput,
		imageUrl,
		validatePrimaryID,
		validateFirstname,
		validateMiddlename,
		validateLastname,
		validateMobile,
		handleUpdateInputChange,
		isUpdateFormDefault,
		setIsUpdateFormDefault,
		updateFormError,
		setUpdateFormError,
		updateFormSuccess,
		setUpdateFormSuccess,
		handleUpdateSubmit,
		isUpdating,
		setIsUpdating,
        isLoadingData,
        setIsLoadingData
	} = PendingFunctions()

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A"
        return new Date(Number(timestamp) / 1_000_000).toLocaleString()
    }

  	return (
    <>
	
        {userIdentity && principalId && userData ? (
            <>

            <div className="h1-profile fadeInContent"><p>PRIME LENDROW</p></div>

            <div className="signout fadeInContent" onClick={signOut}>Sign Out</div>

            <div className={`overlay-bg ${showSignOut ? "active" : ""}`}></div>

            <div className={`overlay-bg ${showPrimaryID ? "active" : ""}`}></div>

            <div className={`overlay-bg ${showUpdateForm ? "active" : ""}`}></div>

            <div className={`signout-form ${showSignOut ? "active" : ""}`}>
                <h2>Sign Out Form</h2>
                        
                <p>Are you sure you want to Sign Out?</p>
                            
                <div className="buttons">
                    <div className="close" onClick={cancelSignOut}>Cancel</div>
                    <div className="confirm" onClick={handleSignOut} disabled={isSigningOut}>{isSigningOut ? ('Signing Out') : ('Confirm')}</div>
                </div>
            </div>

            <div className="picture fadeInContent">
                <div className="prof">
                        <img src={userData?.picture || "pictures/logo.png"} alt="Profile" />
                </div> 
            </div>

            <div className="name fadeInContent">
                Welcome! <br/>{userData?.username?.split('@')[0] || "primelendrow User"}
            </div>

            <div className="my-info fadeInContent">
                <div className="profile-info">
                    <h2>Profile Information</h2>
                <div>
                    <input type="hidden" placeholder="User ID" disabled />
                            
                    <div className="primary-ids">
                            
                    <span className="id-text">Primary ID</span>
                    <div className="primary-id" onClick={showID}>
                        <img src={userData?.primaryId || "pictures/logo.png"} alt="Primary ID" />
                    </div>

                    {userData?.userType === 'Pending' && userData?.userLevel === 'L1' && userData?.userBadge === 'Normal' && <div className="users-status">
                        <i className='bx bxs-error-circle'></i><p className='pending-verifying'>Pending Account! Please verify your identity.</p>
                    </div> || userData?.userType === 'Verifying' && userData?.userLevel === 'L1' && userData?.userBadge === 'Normal' && <div className="users-status">
                        <i className='bx bxs-error-circle'></i><p className='pending-verifying'>Verifying Account! Please wait for updates.</p>
                    </div>}

                    {userData?.userType === 'User' && userData?.userLevel === 'L2' && userData?.userBadge === 'Verified'  && <div className="users-status">
                        <i className='bx bxs-check-circle'></i><p className='verified'>Verification Completed! Please sign in again.</p>
                    </div> || userData?.userType === 'Admin' && userData?.userLevel === 'L100' && userData?.userBadge === 'Verified'  && <div className="users-status">
                        <i className='bx bxs-check-circle'></i><p className='verified'>Verification Completed! Please sign in again.</p>
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

                    {userData?.userType === 'Pending' && userData?.userLevel === 'L1' && userData?.userBadge === 'Normal' && <div className="update" onClick={showUpdate}>Update</div> || 
                    userData?.userType === 'Verifying' && userData?.userLevel === 'L1' && userData?.userBadge === 'Normal'  && <div className="update" onClick={showUpdate}>Update</div>}
                    {userData?.userType === 'User' && userData?.userLevel === 'L2' && userData?.userBadge === 'Verified'  && <div className="update">Verified</div>}
                    {userData?.userType === 'Admin' && userData?.userLevel === 'L100' && userData?.userBadge === 'Verified' && <div className="update" onClick={showUpdate}>Update</div>}
                
                </div>
            </div>

                <div className={`id ${showPrimaryID ? "active" : ""}`}>
                    <div className="title">Primary ID<i className='bx bxs-message-square-x' onClick={hideID}></i></div>
                    <img src={userData?.primaryId || "pictures/logo.png"} alt="Primary ID" />
                </div>

            <div className={`update-form ${showUpdateForm ? "active" : ""}`}>
                <h2>Update Form</h2>

                <div className="update-form-info">

                <form noValidate onSubmit={handleUpdateSubmit} encType='multipart/form-data'>
                    
                    <div className="inputBox">
                    <label>Insert Primary ID (less than 1MB)</label>
                    <i className='bx bx-image-add'></i>
                    <input type="file" accept="image/*" ref={fileInput} onChange={(e) => handleUpdateInputChange('primaryid', e.target.files[0])} autoComplete="new-image" />
                    {errors.primaryid && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.primaryid}</p></span>)}
                    </div>

                    <div className="inputBox">
                    <i className='bx bxs-user-rectangle'></i>
                    <input type="text" placeholder="Enter your Firstname" value={formData.firstname ?? ''} onChange={(e) => handleUpdateInputChange('firstname', e.target.value)} autoComplete="new-firstname" />
                    {errors.firstname && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.firstname}</p></span>)}
                    </div>

                    <div className="inputBox">
                    <i className='bx bxs-user-badge'></i>
                    <input type="text" placeholder="Enter your Middlename" value={formData.middlename ?? ''} onChange={(e) => handleUpdateInputChange('middlename', e.target.value)} autoComplete="new-middlename" />
                    {errors.middlename && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.middlename}</p></span>)}
                    </div>

                    <div className="inputBox">
                    <i className='bx bxs-user-account'></i>
                    <input type="text" placeholder="Enter your Lastname" value={formData.lastname ?? ''} onChange={(e) => handleUpdateInputChange('lastname', e.target.value)} autoComplete="new-lastname" />
                    {errors.lastname && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.lastname}</p></span>)}
                    </div>

                    <div className="inputBox">
                        <i className='bx bxs-phone'></i>
                        <input type="text" placeholder="Enter your Mobile No." value={formData.mobile ?? ''} onChange={(e) => handleUpdateInputChange('mobile', e.target.value)} autoComplete="new-mobile" />
                        {errors.mobile && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.mobile}</p></span>)}
                    </div>
                    
                    {updateFormSuccess && <span className="empty-error-message"><i className="bx bxs-check-circle"></i><p className="blue">{updateFormSuccess}</p></span>}
                    {updateFormError && (<span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{updateFormError}</p></span>)}
                    {errors.updateForm && (<span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{errors.updateForm}</p></span>)}

                    <div className="update-buttons">

                        <div className="close" onClick={hideUpdate}>Close</div>

                        <button type="submit" className="submit-update" disabled={isUpdating}>
                            {isUpdating ? (<span className="animated-dots">Updating<span className="dots"></span></span>) : ('Update')}
                        </button>

                    </div>

                </form>

                </div>

            </div>

            </>
        ):(

            <>
            <div className="admin-loader">

            <div className="pc">
                <div className="pcscreen"></div>

                <div className="base-one"></div>
                <div className="base-two"></div>
            </div>

            <div className="inner-sq"></div>
            <div className="outer-sq"></div>
            <div className="outer-sq2"></div>

            <div className="ipad">
                <div className="line"></div>
            </div>

            <div className="phone"></div>

            <div className="text">Loading</div>

            </div>
            </>
                    
        )}
                

    </>
  	)
}

export default Pending