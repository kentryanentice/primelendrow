import React, { useState, useEffect } from 'react'
import AdminAccountFunctions from '../functions/AdminAccountFunctions'
import { Principal } from '@dfinity/principal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../css/admin-account.css'

function AdminAccounts() {
	
	const {
		userAccounts,
        setUserAccount,
        loadingFields,
        setLoadingFields,
        verifying,
        setVerifying,
        swiperLoading,
        setSwiperLoading,
        verifyUsers,
        fetchAllUsers,
        verifyError,
        verifySuccess,
        showAccountsCard,
        setShowAccountsCard,
        selectedUser,
        setSelectedUser,
        showCard,
        hideCard
	} = AdminAccountFunctions()

	return (
	<>
		
		<div className={`overlay-bg ${showAccountsCard ? "active" : ""}`}></div>

		<div className="accounts fadeInContent">

			<div className="refresh-icon"  onClick={fetchAllUsers}>{!swiperLoading ? (<i className='bx bx-cog' ></i>) : (<i className='bx bx-cog bx-spin' ></i>)}</div>
		
			<div className="accounts-content">

				<div className="slide-container">

					<div className="slide-content">

						{swiperLoading ? (<div className="loading-icon fadeInLoader"><i className='bx bx-loader-circle bx-spin' ></i></div>) : userAccounts && userAccounts.length > 0 ? (
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={10}
							slidesPerView={3}
							slidesPerGroup={1}
							grabCursor={true}
							centerInsufficientSlides={true}
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							pagination={{
								el: '.swiper-pagination',
								clickable: true,
								dynamicBullets: true,
							}}
							breakpoints={{
								0: { slidesPerView: 1 },
								900: { slidesPerView: 1 },
								1080: { slidesPerView: 3 },
							}}>

							{userAccounts.map((user, index) => (
								<SwiperSlide key={user.id || index}>
									<div className="card fadeInContent">
										<div className="image-content">
											<span className="overlay"></span>
											<div className="card-image">
												<div className="card-img">
													<img src={user?.picture || "pictures/logo.png"} alt="Profile Picture" />
												</div>
											</div>
											<div className="fullname">
											{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : ((user?.firstName || "") + " " + (user?.middleName || "") + " " + (user?.lastName || "")).trim() 
												|| "No Fullname" }
											</div>	
										</div>

										<div className="card-content">
											<div className="details">
											<label>{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : `Created at  ${user.createdAt ? new Date(Number(user.createdAt) / 1_000_000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "No Date"}`}</label>
											</div>

											<div className="details">
												<label>Username</label>
												<span className="input">{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : user?.username?.split('@')[0].slice(0, 10) || "Username"}</span>
											</div>

											<div className="details">
												<label>Mobile No.</label>
												<span className="input">{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : user?.mobile || "-"}</span>
											</div>

											<div className="details">
												<label>Account Status</label>
												<span className="input">{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : user?.userType || "Account Status"}</span>
											</div>

											<div className="details">
												<label>User Status</label>
												<span className="input">{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : user?.userBadge || "User Status"}</span>
											</div>

										</div>

										<div className="card-view">
											<button className="view" onClick={() => showCard(user.id)}>View</button>
										</div>

									</div>
								</SwiperSlide>
							))}
						</Swiper>
					) : (
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
							
							<div className="text">Admin Accounts is currently Empty</div>

						</div>
					)}
						</div>
					
					{swiperLoading || userAccounts && userAccounts.length > 0 && (
					<>
						<div className="swiper-button-next swiper-navBtn"></div>
						<div className="swiper-button-prev swiper-navBtn"></div>
						<div className="swiper-pagination swiper-navBtn"></div>
					</>
					)}

				</div>

				{verifySuccess && (<span className="results"><i className="bx bxs-check-circle"></i><p className="blue">{verifySuccess}</p></span>)}
                {verifyError && (<span className="results"><i className="bx bxs-error-circle"></i><p className="red">{verifyError}</p></span>)}
		
			</div>
			
		</div>
			
			{userAccounts && userAccounts.map((user, index) => (
			<div className={`accounts-card ${(showAccountsCard && selectedUser === user.id) ? "active" : ""}`} key={user.id || index}>

				<div className="image-content">

					<span className="overlay"></span>

					<div className="card-image">
						<div className="card-img">
							<img src={user?.picture || "pictures/logo.png"} alt="Profile Picture" />
						</div>
					</div>
										
					<div className="fullname">
						{loadingFields[user.id] ? (<div className="loading-input"><i className='bx bx-loader-circle bx-spin' ></i></div>) : ((user?.firstName || "") + " " + (user?.middleName || "") + " " + (user?.lastName || "")).trim() 
						|| "No Fullname" }
					</div>

				</div>

				<div className="account-primary-ids">
							
					<span className="account-id-text">Primary ID</span>
					<div className="account-primary-id">
						<img src={user?.primaryid || "pictures/logo.png"} alt="Primary ID" />
					</div>

				</div>
			
				<div className="buttons">
					<div className="close" onClick={hideCard}>Close</div>
					<div className="confirm" onClick={() => verifyUsers(user.id)}>
						{verifying ? (<span className="animated-dots">Verifying<span className="dots"></span></span>) : ('Verify')}
					</div>
				</div>
			
			</div>
			))}
		
	</>
	)
}

export default AdminAccounts