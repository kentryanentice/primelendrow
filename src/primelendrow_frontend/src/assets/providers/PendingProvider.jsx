import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Session } from '../providers/SessionProvider'

function PendingProvider({ children }) {

    const {
        loading,
        userIdentity,
        principalId,
        userData
    } = Session()

    const location = useLocation()

    const pendingRoutes = [ '/pending' ]

    if (loading) {
        return (
            <div className="loading"> <p>©2023 Prime LendRow Official</p> </div>
        )
    }

    if (!loading) {
        if (!userIdentity && !principalId && !userData) {
            return children
        }
    
        if (userIdentity && principalId && userData && ((userData.userType === 'Pending' && userData.userLevel === 'L1' && userData.userBadge === 'Normal') ||
            (userData.userType === 'Verifying' && userData.userLevel === 'L1' && userData.userBadge === 'Normal'))) {
            if (pendingRoutes.includes(location.pathname)) {
                return children
            } else {
                return <Navigate to="/pending" />
            }
        }
    }

    return children
}

export default PendingProvider