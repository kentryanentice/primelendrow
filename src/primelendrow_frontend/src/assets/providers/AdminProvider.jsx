import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Session } from '../providers/SessionProvider'

function AdminProvider({ children }) {
    
    const {
        loading,
        userIdentity,
        principalId,
        userData
    } = Session()

    const location = useLocation()

    const adminRoutes = [ '/admin-accounts', '/admin-vault', '/admin-lenders', '/admin-borrowers', '/admin-payments', '/admin-profile' ]

    if (loading) {
        return (
            <div className="loading">©2023 Prime LendRow Official</div>
        )
    }

    if (!loading) {
        if (!userIdentity && !principalId && !userData) {
            return children
        }

        if (userIdentity && principalId && userData && ((userData.userType === 'Admin' && userData.userLevel === 'L100' && userData.userBadge === 'Verified'))) {
            if (adminRoutes.includes(location.pathname)) {
                return children
            } else {
                return <Navigate to="/admin-accounts" />
            }
        }
    }

    return children
}

export default AdminProvider