import React, { useState, useEffect } from 'react'
import { authWithNFID, getIdentity, signoutII } from '../services/authWithNFID'

function AuthWithNFIDFunctions() {
    const [nfidLoading, setNFIDLoading] = useState(true)
    const [nfidUserIdentity, setNFIDUserIdentity] = useState(null)
    const [nfidAuthenticatedActor, setNFIDAuthenticatedActor] = useState(null)
    const [nfidPrincipalId, setNFIDPrincipalId] = useState(null)
    const [nfidIsSigningInAuth, setNFIDIsSigningInAuth] = useState(false)
    const [nfidIsSigningUpAuth, setNFIDIsSigningUpAuth] = useState(false)
    const [nfidUserData, setNFIDUserData] = useState(null)
    const [nfidUserDetails, setNFIDUserDetails] = useState(null)
    const [nfidSignInAuthError, setNFIDSignInAuthError] = useState(null)
    const [nfidSignUpAuthError, setNFIDSignUpAuthError] = useState(null)

    const handleSignInAuthWithNFID = async () => {
        setNFIDIsSigningInAuth(true)
        setNFIDSignInAuthError(null)
        
        try {
            const { identity: nfidUserIdentity, authenticatedActor: nfidAuthenticatedActor } = await authWithNFID()
            const principalId = nfidUserIdentity.getPrincipal()
            
            const nfidExistingUser = await nfidAuthenticatedActor.getUser(principalId)
            
            if (nfidExistingUser.ok) {
                const nfidUserData = nfidExistingUser.ok
                setNFIDUserIdentity(nfidUserIdentity)
                setNFIDAuthenticatedActor(nfidAuthenticatedActor)
                setNFIDPrincipalId(nfidPrincipalId)
                setNFIDUserData(nfidUserData)
                
                window.location.reload()
                
            } else {
                await signoutII()
                setNFIDSignInAuthError('Authentication has been denied. Please sign up first.')
            }
        } catch (error) {
            setNFIDSignInAuthError('Authentication Error. Please try again later.')
        } finally {
            setTimeout(() => {
                setNFIDIsSigningInAuth(false)
            }, 120)
        }
    }
    
    const handleSignUpAuthWithNFID = async () => {
        setNFIDIsSigningUpAuth(true)
        setNFIDSignUpAuthError(null)
        
        try {
            const { identity: nfidUserIdentity, authenticatedActor: nfidAuthenticatedActor } = await authWithNFID()
            const principalId = nfidUserIdentity.getPrincipal()
            
            const existingUser = await nfidAuthenticatedActor.getUser(principalId)
            
            if (existingUser.ok) {
                await signoutII()
                setNFIDSignUpAuthError('Authentication has been confirmed. Please sign in now.')
                
            } else {
                const nfidResult = await nfidAuthenticatedActor.createUser(principalId)
                
                if (nfidResult.ok) {
                    const nfidUserData = nfidResult.ok
                    setNFIDUserIdentity(nfidUserIdentity)
                    setNFIDAuthenticatedActor(nfidAuthenticatedActor)
                    setNFIDPrincipalId(nfidPrincipalId)
                    setNFIDUserData(nfidUserData)
                    
                    window.location.reload()
                } else {
                    setNFIDSignUpAuthError(nfidResult.err)
                }
            }
        } catch (error) {
            setNFIDSignUpAuthError('Authentication Error. Please try again later.')
        } finally {
            setTimeout(() => {
                setNFIDIsSigningUpAuth(false)
            }, 120)
        }
    }
    
    return {
        nfidLoading,
        setNFIDLoading,
        nfidUserIdentity,
        setNFIDUserIdentity,
        nfidAuthenticatedActor,
        nfidPrincipalId,
        nfidUserData,
        nfidUserDetails,
        nfidSignInAuthError,
        nfidSignUpAuthError,
        handleSignInAuthWithNFID,
        nfidIsSigningInAuth,
        setNFIDIsSigningInAuth,
        handleSignUpAuthWithNFID,
        nfidIsSigningUpAuth,
        setNFIDIsSigningUpAuth
    }
}

export default AuthWithNFIDFunctions