import React, { useState, useEffect } from 'react'
import { authWithII, getIdentity, signoutII } from '../services/authWithII'
import { Principal } from '@dfinity/principal'

function AdminAccountFunctions() {

    const [loading, setLoading] = useState(true)
    const [verifying, setVerifying] = useState(null)
    const [userAccounts, setUserAccount] = useState(null)
    const [loadingFields, setLoadingFields] = useState([])
    const [swiperLoading, setSwiperLoading] = useState(false)
    const [showAccountsCard, setShowAccountsCard] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [verifyError, setVerifyError] = useState(null)
    const [verifySuccess, setVerifySuccess] = useState(null)

    const showCard = (id) => {
        setSelectedUser(id)
        setShowAccountsCard(true)   
    }
    const hideCard = (id) => {
        setSelectedUser(null)
        setShowAccountsCard(false)
    }

    const verifyUsers = async (userPrincipal) => {

        setVerifying(true)

        try {

            const auth = await getIdentity()

            const { identity: userIdentity, authenticatedActor } = auth
            
            const principalId = userIdentity.getPrincipal()

            const verifyResult = await authenticatedActor.verifyUser(principalId, Principal.fromText(userPrincipal))

            if (verifyResult.ok) {

                const result = await authenticatedActor.getAllUsers(principalId)

                if (result.ok) {

                    const users = result.ok

                    const userAccounts = users.map(user => ({
                        ...user,
                        id: user.principalId.toText?.() || user.principalId,
                        userType: Object.keys(user.userType)[0],
                        userLevel: Object.keys(user.userLevel)[0],
                        userBadge: Object.keys(user.userBadge)[0]
                    }))
            
                    setUserAccount(userAccounts)
                    setVerifyError('')
                    setVerifySuccess('Verification Completed. User upgrade has been successful.')
                } else {
                    setVerifySuccess('')
                    setVerifyError(result.err)
                }
        
            } else {
                setVerifySuccess('')
                setVerifyError(verifyResult.err)
            }

        } catch (error) {
            console.error('Error verifying users:', error)
        } finally {
            setVerifying(false)
        }

    }

    const fetchAllUsers = async () => {

        setSwiperLoading(true)

        try {

            const auth = await getIdentity()

            const { identity: userIdentity, authenticatedActor } = auth
            
            const principalId = userIdentity.getPrincipal()

            const result = await authenticatedActor.getAllUsers(principalId)

            if (result.ok) {
                const users = result.ok

                const userAccounts = users.map(user => ({
                    ...user,
                    id: user.principalId.toText?.() || user.principalId,
                    userType: Object.keys(user.userType)[0],
                    userLevel: Object.keys(user.userLevel)[0],
                    userBadge: Object.keys(user.userBadge)[0]
                }))
        
                setUserAccount(userAccounts)
            }

        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setSwiperLoading(false)
        }

    }

    useEffect(() => {

        fetchAllUsers()

    }, [])

    return {
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
    }
}

export default AdminAccountFunctions