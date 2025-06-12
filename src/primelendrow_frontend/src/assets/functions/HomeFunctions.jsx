import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
//import supabase from '../supabase/supabaseClient'
//import supabaseApi from '../supabase/supabaseApi'

function HomeFunctions() {
 
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()
    const [animation, setAnimation] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [signinPasswordVisible, setSigninPasswordVisible] = useState(false)
    const [isSignupFormDefault, setIsSignupFormDefault] = useState(false)
    const [isSigninFormDefault, setIsSigninFormDefault] = useState(false)
    const [signupSuccess, setSignupSuccess] = useState(false)
    const [signinSuccess, setSigninSuccess] = useState(false)
    const [signupFormError, setSignupFormError] = useState(false)
    const [signinFormError, setSigninFormError] = useState(false)

    const handleSignUpClick = () => {
        setAnimation('animated-signin')
    }

    const handleSignInClick = () => {
        setAnimation('animated-signup')
    }

    const togglePasswordVisibility = (setter) => {
        setter((prevState) => !prevState)
    }

    const [formData, setFormData] = useState({ username: '', password: '', confirmpass: '', signinUsername: '', signinPassword: '' })
    const [errors, setErrors] = useState({ username: '', password: '', confirmpass: '', signupForm: '', signinUsername: '', signinPassword: '', signinForm: '' })

    const validateUsername = (username) => {

        if (!username.trim()) return ''

        if (/[^a-zA-Z0-9]/.test(username)) {
            return 'Invalid Username! Please use characters without spaces.'
        } else if (username.length < 6) {
            return 'Invalid Username! Please enter at least 6 characters.'
        }
        return ''

    }

    const validatePassword = (username, password) => {

        if (!password.trim()) return ''

        if (username === password) {
            return 'Password should not be the same as the username.'
        } else if (/\s/.test(password)) {
            return 'Password should not contain spaces.'
        } else if (password.length < 6) {
            return 'Weak Password. Please enter at least 6 characters.'
        }
        return ''

    }

    const validateConfirmPassword = (password, confirmpass) => {

        if (!confirmpass.trim()) return ''

        if (password !== confirmpass) {
            return 'Your passwords didn’t match, please try again!'
        }
        return ''

    }

    const handleSignupInputChange = (field, value) => {

        setIsSignupFormDefault(true)
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === 'username') {
            setErrors((prev) => ({
                ...prev,
                username: validateUsername(value),
                password: validatePassword(value, formData.password)
            }))
        } else if (field === 'password') {
            setErrors((prev) => ({
                ...prev,
                password: validatePassword(formData.username, value),
                confirmpass: validateConfirmPassword(value, formData.confirmpass)
            }))
        } else if (field === 'confirmpass') {
            setErrors((prev) => ({
                ...prev,
                confirmpass: validateConfirmPassword(formData.password, value)
            }))
        }

    }

    useEffect(() => {

        if (!isSignupFormDefault || signupSuccess) 
        return

        const isSignupFormEmpty =
            !(formData.username?.trim()) ||
            !(formData.password?.trim()) ||
            !(formData.confirmpass?.trim())

        const hasSignupErrors =
            errors.username ||
            errors.password ||
            errors.confirmpass

        const signupFormError = isSignupFormEmpty
            ? 'There are empty fields, please adjust them properly.'
            : hasSignupErrors
            ? 'There are incorrect fields, please adjust them properly.'
            : ''

        setErrors((prev) => ({
            ...prev, signupForm: signupFormError
        }))

    }, [formData, isSignupFormDefault, signupSuccess])
      
    const handleSignupSubmit = async (e) => {

        e.preventDefault()
    
        const isSignupFormEmpty =
            !(formData.username?.trim()) ||
            !(formData.password?.trim()) ||
            !(formData.confirmpass?.trim())
    
        const hasSignupErrors =
            errors.username ||
            errors.password ||
            errors.confirmpass
    
        const signupFormError = isSignupFormEmpty
            ? 'There are empty fields, please adjust them properly.'
            : hasSignupErrors
            ? 'There are incorrect fields, please adjust them properly.'
            : ''
    
        setErrors((prev) => ({ ...prev, signupForm: signupFormError }))
            if (signupFormError) {
            setSignupSuccess('')
            return
        }
    
        if (!signupFormError) {

            setIsSigningUp(true)
            
            setSignupSuccess('')

            try {
                const cleaned = (str) => str.trim().replace(/\s+/g, ' ')

                const username = cleaned(formData.username.trim())
                const password = cleaned(formData.password.trim())

                const { data: result } = await supabaseApi.post('/signup', {
                    username: username,
                    password: password
                })
            
                if (!result.success || result.error) {
                    setErrors(prev => ({
                        ...prev,
                        signupForm: result.error
                    }))
                    setIsSigningUp(false)
                    return
                }

                if (result.success) {

                    setSignupSuccess(result.message)

                    setSignupFormError('')

                    setIsSigningUp(false)
                    setFormData({
                        username: '',
                        password: '',
                        confirmpass: '',
                    })
                }
                
            } 
            catch (error) {
                setErrors((prev) => ({ 
                    ...prev, signupForm: 'An unexpected error occurred. Please try again later.'
                }))
                setSignupFormError('')
                setIsSigningUp(false)
            }
        }

    }

    const validateSigninUsername = (signinUsername) => {

        if (/[^a-zA-Z0-9]/.test(signinUsername)) {
            return 'Invalid Username! Please use characters without spaces.'
        }
        return ''

    }

    const validateSigninPassword = (signinPassword) => {

        if (/\s/.test(signinPassword)) {
            return 'Password should not contain spaces.'
        }
        return ''

    }

    const handleSigninInputChange = (field, value) => {

        setIsSigninFormDefault(true)
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === 'signinUsername') {
            setErrors((prev) => ({
                ...prev, signinUsername: validateSigninUsername(value)
            }))
        } else if (field === 'signinPassword') {
            setErrors((prev) => ({
                ...prev, signinPassword: validateSigninPassword(value)
            }))
        }

    }

    useEffect(() => {

        if (!isSigninFormDefault) 
            return

        const isSigninFormEmpty = 
            !(formData.signinUsername?.trim()) || 
            !(formData.signinPassword?.trim())
        const hasSigninErrors = 
            errors.signinUsername || 
            errors.signinPassword

        const signinFormError = isSigninFormEmpty
            ? 'There are empty fields, please adjust them properly.'
            : hasSigninErrors
            ? 'There are incorrect fields, please adjust them properly.'
            : ''

        setErrors((prev) => ({
            ...prev, signinForm: signinFormError
        }))

    }, [formData, isSigninFormDefault])

    
    const handleSigninSubmit = async (e) => {

        e.preventDefault()
    
        const isSigninFormEmpty = 
            !(formData.signinUsername?.trim()) || 
            !(formData.signinPassword?.trim())
        const hasSigninErrors = 
            errors.signinUsername || 
            errors.signinPassword
    
        const signinFormError = isSigninFormEmpty
        ? 'There are empty fields, please adjust them properly.'
        : hasSigninErrors
        ? 'There are incorrect fields, please adjust them properly.'
        : ''
    
        setErrors((prev) => ({ ...prev, signinForm: signinFormError }))

        if (!signinFormError) {

            setIsSigningIn(true)
            
            setSigninSuccess('')

            try {
                
                const { data: result } = await supabaseApi.post('/signin', {
                    username: formData.signinUsername,
                    password: formData.signinPassword,
                })

                if (!result.success || result.error) {
                    setErrors(prev => ({
                        ...prev,
                        signinForm: result.error
                    }))
                    setIsSigningIn(false)
                    return
                }

                if (result.success) {

                    const session = result.data.session

                    if (session) {
                        await supabase.auth.setSession({ access_token: session.access_token, refresh_token: session.refresh_token })

                        setTimeout(() => {
                            window.location.reload()
                        }, 30)
                    }
                    
                }
        
            } catch (error) {
                setErrors((prev) => ({ 
                    ...prev, signinForm: 'An unexpected error occurred. Please try again later.'
                }))
                setSigninFormError('')
                setIsSigningIn(false)
            }
        }

    }

    return {
        navigate,
        animation,
        setAnimation,
        isSigningUp,
        setIsSigningUp,
        isSigningIn,
        setIsSigningIn,
        passwordVisible,
        setPasswordVisible,
        confirmPasswordVisible,
        setConfirmPasswordVisible,
        signinPasswordVisible,
        setSigninPasswordVisible,
        isSignupFormDefault,
        setIsSignupFormDefault,
        isSigninFormDefault,
        setIsSigninFormDefault,
        signupSuccess,
        setSignupSuccess,
        signinSuccess,
        setSigninSuccess,
        signupFormError,
        setSignupFormError,
        signinFormError,
        setSigninFormError,
        userDetails,
        setUserDetails,
        handleSignInClick,
        handleSignUpClick,
        togglePasswordVisibility,
        formData,
        setFormData,
        errors,
        setErrors,
        handleSignupInputChange,
        handleSigninInputChange,
        handleSignupSubmit,
        handleSigninSubmit
    }
    
}

export default HomeFunctions