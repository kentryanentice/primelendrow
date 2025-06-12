import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/index.css'
import { Session } from '../providers/SessionProvider'
// import { signoutII } from '../services/authWithII'

function Index() {

	 const {
		loading,
		userIdentity,
        principalId,
        userData
	} = Session()

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home")
        }, 10000)

        return () => clearTimeout(timer)
    }, [navigate])

  	return (
    
    <>

        {!userIdentity && !principalId && !userData ? (

			<>
				<div className="primelendrow fadeInContent">

					<h1>Prime LendRow</h1>
					<h2>Prime LendRow</h2>
							
					<p className="class1">Connect with creditors and debtors</p>
								
					<p className="class2">around you with lendrow.</p>
								
					<div className="start">
						<Link to="/home" className="animated-dots" draggable="false">Getting Started<span className="dots"></span></Link>
					</div>
					{/* <button onClick={signoutII}>Sign Out</button> */}
					
				</div>
			</>
            
        ):(

            <div className="loading-input fadeInLoader"><i className='bx bx-loader-circle bx-spin' ></i></div>

	    )}

    </>

  	)
}

export default Index