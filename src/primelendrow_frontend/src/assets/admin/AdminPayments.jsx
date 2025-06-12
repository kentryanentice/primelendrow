import React, { useState, useEffect } from 'react'
import '../css/admin-account.css'

function AdminPayments() {

	return (
	<>
		
		<div className="overlay-bg" ></div>

		<div className="accounts">
		
			<div className="accounts-content">
				<div className="slide-container swiper">
					<div className="slide-content">
						<div className="card-wrapper swiper-wrapper">
                            Admin Payments
						</div>
					</div>
			
					<div className="swiper-button-next swiper-navBtn"></div>
					<div className="swiper-button-prev swiper-navBtn"></div>
					<div className="swiper-pagination"></div>
				</div>
		
			</div>
			
		</div>
		
	</>
	)
}

export default AdminPayments