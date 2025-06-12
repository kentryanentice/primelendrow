import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Session } from './SessionProvider'

function NullProvider({ children }) {
    
    const {
            loading,
            userIdentity,
            principalId,
            userData
        } = Session()

    if (loading) {
        return (
            <div className="loading">©2023 Prime LendRow Official</div>
        )
    }

    if (!loading) {
        if (!userIdentity && !principalId && !userData) {
            return children
        }

        if (userIdentity && principalId && userData && ((userData.userType === 'Pending' && userData.userLevel === 'L1' && userData.userBadge === 'Normal') ||
            (userData.userType === 'Verifying' && userData.userLevel === 'L1' && userData.userBadge === 'Normal') ||
            (userData.userType === 'User' && userData.userLevel === 'L2' && userData.userBadge === 'Verified') ||
            (userData.userType === 'Admin' && userData.userLevel === 'L100' && userData.userBadge === 'Verified'))) {
            return children
        }
    }

    return children
}

export default NullProvider