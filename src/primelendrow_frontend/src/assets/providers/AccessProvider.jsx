import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Session } from '../providers/SessionProvider'

function AccessProvider({ children }) {

    const {
        loading,
        userIdentity,
        principalId,
        userData
    } = Session()

    const location = useLocation()

    const pendingRoutes = [ '/pending' ]
    const userRoutes = [ '/lenders', '/borrowers', '/payments']
    const adminRoutes = [ '/admin-accounts', '/admin-vault', '/admin-lenders', '/admin-borrowers', '/admin-payments', '/admin-profile' ]

    if (loading) {
        return (
            <div className="loading"> <p>©2023 Prime LendRow Official</p> </div>
        )
    }

    if (!loading) {
    
        if (userIdentity && principalId && userData && ((userData.userType === 'Pending' && userData.userLevel === 'L1' && userData.userBadge === 'Normal') ||
            (userData.userType === 'Verifying' && userData.userLevel === 'L1' && userData.userBadge === 'Normal') ||
            (userData.userType === 'User' && userData.userLevel === 'L2' && userData.userBadge === 'Verified') ||
            (userData.userType === 'Admin' && userData.userLevel === 'L100' && userData.userBadge === 'Verified'))) {
            if ((pendingRoutes.includes(location.pathname)) || (userRoutes.includes(location.pathname)) || (adminRoutes.includes(location.pathname))) {
                return children
            } else {
                return <Navigate to="/home" />
            }
        }
    }

    return children
}

export default AccessProvider