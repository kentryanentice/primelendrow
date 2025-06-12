import React, { useState, useEffect } from 'react'
import { authWithII, getIdentity, signoutII } from '../services/authWithII'

function AuthWithIIFunctions() {
    const [loading, setLoading] = useState(true)
    const [userIdentity, setUserIdentity] = useState(null)
    const [authenticatedActor, setAuthenticatedActor] = useState(null)
    const [principalId, setPrincipalId] = useState(null)
    const [isSigningInAuth, setIsSigningInAuth] = useState(false)
    const [isSigningUpAuth, setIsSigningUpAuth] = useState(false)
    const [userData, setUserData] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const [signInAuthError, setSignInAuthError] = useState(null)
    const [signUpAuthError, setSignUpAuthError] = useState(null)

    const handleSignInAuthWithII = async () => {
        setIsSigningInAuth(true)
        setSignInAuthError(null)
        
        try {
            const { identity: userIdentity, authenticatedActor } = await authWithII()
            const principalId = userIdentity.getPrincipal()
            
            const existingUser = await authenticatedActor.getUser(principalId)
            
            if (existingUser.ok) {
                const userData = existingUser.ok
                setUserIdentity(userIdentity)
                setAuthenticatedActor(authenticatedActor)
                setPrincipalId(principalId)
                setUserData(userData)
                
                window.location.reload()
                
            } else {
                await signoutII()
                setSignInAuthError('Authentication has been denied. Please sign up first.')
            }
        } catch (error) {
            setSignInAuthError('Authentication Error. Please try again later.')
        } finally {
            setTimeout(() => {
                setIsSigningInAuth(false)
            }, 120)
        }
    }
    
    const handleSignUpAuthWithII = async () => {
        setIsSigningUpAuth(true)
        setSignUpAuthError(null)
        
        try {
            const { identity: userIdentity, authenticatedActor } = await authWithII()
            const principalId = userIdentity.getPrincipal()
            
            const existingUser = await authenticatedActor.getUser(principalId)
            
            if (existingUser.ok) {
                await signoutII()
                setSignUpAuthError('Authentication has been confirmed. Please sign in now.')
                
            } else {
                const result = await authenticatedActor.createUser(principalId)
                
                if (result.ok) {
                    const userData = result.ok
                    setUserIdentity(userIdentity)
                    setAuthenticatedActor(authenticatedActor)
                    setPrincipalId(principalId)
                    setUserData(userData)
                    
                    window.location.reload()
                } else {
                    setSignUpAuthError(result.err)
                }
            }
        } catch (error) {
            setSignUpAuthError('Authentication Error. Please try again later.')
        } finally {
            setTimeout(() => {
                setIsSigningUpAuth(false)
            }, 120)
        }
    }
    
    return {
        loading,
        setLoading,
        userIdentity,
        setUserIdentity,
        authenticatedActor,
        principalId,
        userData,
        userDetails,
        signInAuthError,
        signUpAuthError,
        handleSignInAuthWithII,
        isSigningInAuth,
        setIsSigningInAuth,
        handleSignUpAuthWithII,
        isSigningUpAuth,
        setIsSigningUpAuth
    }
}

export default AuthWithIIFunctions