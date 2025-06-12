import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signoutII } from '../services/authWithII'

function AdminProfileFunctions() {

    const navigate = useNavigate()
    const [showSignOut, setShowSignOut] = useState(false)
    const signOut = () => setShowSignOut(true)
    const cancelSignOut = () => setShowSignOut(false)
    const [isSigningOut, setIsSigningOut] = useState(false)
    const [showPrimaryID, setShowPrimaryID] = useState(false)
    const showID = () => setShowPrimaryID(true)
    const hideID = () => setShowPrimaryID(false)
    const [isUpdateFormDefault, setIsUpdateFormDefault] = useState(false)
    const [updateFormError, setUpdateFormError] = useState(false)
    const [updateFormSuccess, setUpdateFormSuccess] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleSignOut = async () => {

        setIsSigningOut(true)

        try {

            const signout = await signoutII()
            
            if (signout) {
                if (location.pathname !== '/' && location.pathname !== '/home') {
                    navigate('/home')
                }
                return

            } else {
                window.location.reload()
            }

        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => 
                setIsSigningOut(false), 800
            )
        }
        
    }

    return {
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
    }
}

export default AdminProfileFunctions