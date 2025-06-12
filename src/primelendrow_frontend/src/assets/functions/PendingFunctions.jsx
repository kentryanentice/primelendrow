import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getIdentity, signoutII } from '../services/authWithII'
import { Session } from '../providers/SessionProvider'
import { Principal } from '@dfinity/principal'

function PendingFunctions() {
    
    const {
        userIdentity,
        principalId,
        userData,
        authenticatedActor,
        setUserData
    } = Session()

    const navigate = useNavigate()
    const [showSignOut, setShowSignOut] = useState(false)
    const signOut = () => setShowSignOut(true)
    const cancelSignOut = () => setShowSignOut(false)
    const [isSigningOut, setIsSigningOut] = useState(false)
    const [showPrimaryID, setShowPrimaryID] = useState(false)
    const showID = () => setShowPrimaryID(true)
    const hideID = () => setShowPrimaryID(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false) 
    const showUpdate = () => setShowUpdateForm(true)
    const hideUpdate = () => setShowUpdateForm(false)
    const [isUpdateFormDefault, setIsUpdateFormDefault] = useState(false)
    const [updateFormError, setUpdateFormError] = useState(false)
    const [updateFormSuccess, setUpdateFormSuccess] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)

    const [formData, setFormData] = useState({ primaryid: '', firstname: '', middlename: '', lastname: '', mobile: ''})
    const [errors, setErrors] = useState({ primaryid: '', firstname: '', middlename: '', lastname: '', mobile: '', updateForm: '' })
    const fileInput = useRef(null)
    const imageUrl = useRef(null)

    const validatePrimaryID = (file) => {
        const allowedFormats = ["image/jpeg", "image/png", "image/gif"]
        const maxSize = 1 * 1024 * 1024
    
        if (!file || file.length === 0) {
            return "Invalid Primary ID Field. Please insert an image to upload."
        }
    
        if (!allowedFormats.includes(file.type)) {
            return "Invalid Primary ID Format. Only JPG, PNG, and GIF are allowed."
        }
    
        if (file.size > maxSize) {
            return "Invalid Primary ID Size. Please insert an image 1MB below."
        }
    
        return ""
    }
    
    const validateFirstname = (firstname) => {
        if (!firstname.trim()) return ''

        if (/[^a-zA-Z ]/.test(firstname)) {
            return 'Invalid Firstname! Please use letters only.'
        }
        return ''
    }

    const validateMiddlename = (middlename) => {
        if (!middlename.trim()) return ''

        if (/[^a-zA-Z ]/.test(middlename)) {
            return 'Invalid Middlename! Please use letters only.'
        }
        return ''
    }

    const validateLastname = (lastname) => {
        if (!lastname.trim()) return ''

        if (/[^a-zA-Z ]/.test(lastname)) {
            return 'Invalid Lastname! Please use letters only.'
        }
        return ''
    }

    const validateMobile = (mobile) => {
        if (!mobile.trim()) return ''

        if (mobile.length > 0 && (!/^09/.test(mobile) || mobile.length !== 11 || !/^\d+$/.test(mobile))) {
            return 'Invalid Mobile No.! Please use Philippine Mobile No. only.'
        }
        return ''
    }

    const capitalization = (str) => {
        return str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    }

    const handleUpdateInputChange = (field, value) => {

        setIsUpdateFormDefault(true)

        if (field === 'primaryid') {
            const file = value
            setFormData((prev) => ({
                ...prev, [field]: file 
            }))
            setErrors((prev) => ({
                ...prev, primaryid: validatePrimaryID(file)
            }))
        } else {
            if (field === 'firstname' || field === 'middlename' || field === 'lastname') {
                value = capitalization(value)
            }

            setFormData((prev) => ({ ...prev, [field]: value }))

            if (field === 'firstname') {
                setErrors((prev) => ({
                    ...prev, firstname: validateFirstname(value)
                }))
            } else if (field === 'middlename') {
                setErrors((prev) => ({ 
                    ...prev, middlename: validateMiddlename(value)
                }))
            } else if (field === 'lastname') {
                setErrors((prev) => ({
                    ...prev, lastname: validateLastname(value) }))
            } else if (field === 'mobile') {
                setErrors((prev) => ({
                    ...prev, mobile: validateMobile(value)
                }))
            }
        }

    }

    useEffect(() => {

        if (!isUpdateFormDefault || updateFormSuccess) 
        return

        const isUpdateFormEmpty =
            !formData.primaryid ||
            !(formData.firstname?.trim()) ||
            !(formData.middlename?.trim()) ||
            !(formData.lastname?.trim()) ||
            !(formData.mobile?.trim())

        const hasUpdateErrors =
            errors.primaryid ||
            errors.firstname ||
            errors.middlename ||
            errors.lastname ||
            errors.mobile

        const updateFormError = isUpdateFormEmpty
            ? 'There are empty fields, please adjust them properly.'
            : hasUpdateErrors
            ? 'There are incorrect fields, please adjust them properly.'
            : ''

        setErrors((prev) => ({
            ...prev, updateForm: updateFormError
        }))

    }, [formData, isUpdateFormDefault, updateFormSuccess])

    const handleUpdateSubmit = async (e) => {

        e.preventDefault()
    
        const isUpdateFormEmpty =
            !formData.primaryid ||
            !(formData.firstname?.trim()) ||
            !(formData.middlename?.trim()) ||
            !(formData.lastname?.trim()) ||
            !(formData.mobile?.trim())

        const hasUpdateErrors =
            errors.primaryid ||
            errors.firstname ||
            errors.middlename ||
            errors.lastname ||
            errors.mobile

        const updateFormError = isUpdateFormEmpty
            ? 'There are empty fields, please adjust them properly.'
            : hasUpdateErrors
            ? 'There are incorrect fields, please adjust them properly.'
            : ''
    
        setErrors((prev) => ({ ...prev, updateForm: updateFormError }))
            if (updateFormError) {
            setUpdateFormSuccess('')
            return
        }
    
        if (!updateFormError) {

            setIsUpdating(true)
            
            setUpdateFormSuccess('')

            try {

                const auth = await getIdentity()

                const { identity: userIdentity, authenticatedActor } = auth

                if (userIdentity) {
                    const principalId = userIdentity.getPrincipal()

                    const file = fileInput.current.files[0]
                    if (!file) {
                        setErrors((prev) => ({ ...prev, updateForm: "Primary ID image is required." }))
                        setIsUpdating(false)
                        return
                    }

                    const arrayBuffer = await file.arrayBuffer()
                    const uint8Array = new Uint8Array(arrayBuffer)

                    const result = await authenticatedActor.updateUser(
                        principalId,
                        [...uint8Array],
                        String(formData.firstname).trim(),
                        String(formData.middlename).trim(),
                        String(formData.lastname).trim(),
                        String(formData.mobile).trim()
                    )
            
                    if (result.ok) {

                        setUpdateFormSuccess('Authorized Access. User upgrade has been completed.')
                        setUpdateFormError('')

                        const userData = result.ok
                        const shortUsername = userData.username.slice(0, 10)
                        userData.username = `${shortUsername}`
                        const userType = Object.keys(userData.userType)[0]
                        const userLevel = Object.keys(userData.userLevel)[0]
                        const userBadge = Object.keys(userData.userBadge)[0]

                        userData.userType = userType
                        userData.userLevel = userLevel
                        userData.userBadge = userBadge

                        if (userData.primaryId.length > 0) {
                            const uint8Array = new Uint8Array(userData.primaryId)
                            const blob = new Blob([uint8Array], { type: "image/png" })
            
                            const reader = new FileReader()
                            reader.readAsDataURL(blob)
                            reader.onloadend = () => {
                                userData.primaryId = reader.result
                                setUserData(userData)
                            }
                        } else {
                            userData.primaryId = null
                            setUserData(userData)
                        }
          
                        setIsUpdating(false)
                        setFormData({
                            primaryid: '',
                            firstname: '',
                            middlename: '',
                            lastname: '',
                            mobile: ''
                        })
            
                        if (fileInput.current) {
                            fileInput.current.value = ''
                        }
                    } else if (result.err) {
                        setUpdateFormSuccess('')
                        setUpdateFormError(result.err)
                        setIsUpdating(false)
                    }
                }
                
            }
            catch (error) {
                setErrors((prev) => ({ 
                    ...prev, updateForm: 'An unexpected error occurred. Please try again later.'
                }))
                setUpdateFormError('')
                setIsUpdating(false)
            }
        }

    }

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
            window.location.reload()
            setTimeout(() => 
                setIsSigningOut(false), 800
            )
        }

    }

    return {
        navigate,
        showSignOut,
        signOut,
        cancelSignOut,
        handleSignOut,
        isSigningOut,
        showPrimaryID,
        showID,
        hideID,
        showUpdateForm,
        setShowUpdateForm,
        showUpdate,
        hideUpdate,
        formData,
        setFormData,
        errors,
        setErrors,
        fileInput,
        imageUrl,
        validatePrimaryID,
        validateFirstname,
        validateMiddlename,
        validateLastname,
        validateMobile,
        handleUpdateInputChange,
        isUpdateFormDefault,
        setIsUpdateFormDefault,
        updateFormError,
        setUpdateFormError,
        updateFormSuccess,
        setUpdateFormSuccess,
        handleUpdateSubmit,
        isUpdating,
        setIsUpdating,
        isLoadingData,
        setIsLoadingData
    }

}

export default PendingFunctions