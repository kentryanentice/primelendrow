import React from 'react'
import '../css/home.css'
import { Session } from '../providers/SessionProvider'
import HomeFunctions from '../functions/HomeFunctions'
import AuthWithIIFunctions from '../functions/AuthWithIIFunctions'
import AuthWithNFIDFunctions from '../functions/AuthWithNFIDFunctions'
import ChatBot from './ChatBot'

function Home() {

     const {
        loading,
		userIdentity,
        principalId,
        userData
	} = Session()

    const {
        handleSignInAuthWithII,
        isSigningInAuth,
        setIsSigningInAuth,
        handleSignUpAuthWithII,
        isSigningUpAuth,
        setIsSigningUpAuth,
        signInAuthError,
        signUpAuthError
    } = AuthWithIIFunctions()

    const {
        nfidSignInAuthError,
        nfidSignUpAuthError,
        handleSignInAuthWithNFID,
        nfidIsSigningInAuth,
        setNFIDIsSigningInAuth,
        handleSignUpAuthWithNFID,
        nfidIsSigningUpAuth,
        setNFIDIsSigningUpAuth
    } = AuthWithNFIDFunctions()

    const {
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
    } = HomeFunctions()
    
    return (
    <>

    {!userIdentity && !principalId && !userData ? (

        <>

        <ChatBot />

            <div className="primelendrow-title fadeInContent"><p>PRIME LENDROW</p></div>

                <div className={`wrapper fadeInContent ${animation}`}>

                    <div className="form sign-up">

                        <form onSubmit={handleSignupSubmit} noValidate>

                            <h2>Sign Up</h2>

                            <div className="inputBox">
                                <i className='bx bxs-user'></i>
                                <input type="text" name="username" id="username" placeholder="Enter your Username"
                                value={formData.username ?? ''} onChange={(e) => handleSignupInputChange('username', e.target.value)} autoComplete="new-username" />
                                {errors.username && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.username}</p></span>)}
                            </div>

                            <div className="inputBox">
                                <i className={`bx ${passwordVisible ? 'bxs-lock-open' : 'bxs-lock'}`} onClick={() => togglePasswordVisibility(setPasswordVisible)}></i>
                                <input type={passwordVisible ? 'text' : 'password'} name="pass" id="pass1" placeholder="Enter a Password"
                                value={formData.password ?? ''} onChange={(e) => handleSignupInputChange('password', e.target.value)} autoComplete="new-password" />
                                {errors.password && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.password}</p></span>)}
                            </div>

                            <div className="inputBox">
                                <i className={`bx ${confirmPasswordVisible ? 'bxs-lock-open' : 'bxs-lock'}`} onClick={() => togglePasswordVisibility(setConfirmPasswordVisible)}></i>
                                <input type={confirmPasswordVisible ? 'text' : 'password'} name="confirmpass" id="confirmpass" placeholder="Confirm your Password"
                                value={formData.confirmpass ?? ''} onChange={(e) => handleSignupInputChange('confirmpass', e.target.value)} autoComplete="new-confirmpass" />
                                {errors.confirmpass && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.confirmpass}</p></span>)}
                            </div>

                            <button type="submit" className="btn" disabled={isSigningUp}>{isSigningUp ? (<span className="animated-dots">Signing Up<span className="dots"></span></span>) : ('Sign Up')}</button>
                                {(() => { if (signupSuccess) { return ( <span className="empty-error-message"><i className="bx bxs-check-circle"></i><p className="blue">{signupSuccess}</p></span>)
                                    } else if (errors.signupForm) { return ( <span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{errors.signupForm}</p></span>)
                                    } else if (signUpAuthError) { return ( <span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{signUpAuthError}</p></span>)
                                    } else if (nfidSignUpAuthError) { return ( <span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{nfidSignUpAuthError}</p></span>)
                                    } else { return null }
                                })()}

                            <div className="link">
                                <p>Already have an account?<a onClick={handleSignInClick} className="signin-link"> Sign In</a></p>
                            </div>

                            <div className="internet-identity" onClick={handleSignUpAuthWithII}>
                                {isSigningUpAuth ? (<span className="animated-dots">
                                    <span className="internet-identity-text">Authenticating</span><span className="dots"></span></span>) : (
                                <> <span className="internet-identity-text">Sign Up with Internet Identity</span></>)}
                            </div>

                            <div className="nfid" onClick={handleSignUpAuthWithNFID}>
                                {nfidIsSigningUpAuth ? (<span className="animated-dots">
                                    <span className="nfid-text">Authenticating</span><span className="dots"></span></span>) : (
                                <> <span className="nfid-text">Sign Up with NFID</span></>)}
                            </div>

                        </form>

                    </div>

                    <div className="form sign-in">

                        <form onSubmit={handleSigninSubmit} noValidate>

                            <h2>Sign In</h2>

                            <div className="inputBox">
                                <i className='bx bxs-user'></i>
                                <input type="text" name="signinusername" id="signinusername" placeholder="Enter your Username"
                                value={formData.signinUsername ?? ''} onChange={(e) => handleSigninInputChange('signinUsername', e.target.value)} autoComplete="current-username" />
                                {errors.signinUsername && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.signinUsername}</p></span>)}
                            </div>

                            <div className="inputBox">
                                <i className={`bx ${signinPasswordVisible ? 'bxs-lock-open' : 'bxs-lock'}`} onClick={() => togglePasswordVisibility(setSigninPasswordVisible)}></i>
                                <input type={signinPasswordVisible ? 'text' : 'password'} name="signinpassword" id="signinpassword" placeholder="Enter your Password"
                                value={formData.signinPassword ?? ''} onChange={(e) => handleSigninInputChange('signinPassword', e.target.value)} autoComplete="current-password" />
                                {errors.signinPassword && (<span className="error-message"><i className='bx bxs-error-circle'></i><p className='red'>{errors.signinPassword}</p></span>)}
                            </div>

                            <button type="submit" className="btn" disabled={isSigningIn}>{isSigningIn ? (<span className="animated-dots">Signing In<span className="dots"></span></span>) : ('Sign In')}</button>
                                {(() => { if (signinSuccess) { return ( <span className="empty-error-message"><i className="bx bxs-check-circle"></i><p className="blue">{signinSuccess}</p></span>)
                                    } else if (errors.signinForm) { return ( <span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{errors.signinForm}</p></span>)
                                    } else if (signInAuthError) { return ( <span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{signInAuthError}</p></span>)
                                    } else if (nfidSignInAuthError) { return ( <span className="empty-error-message"><i className="bx bxs-error-circle"></i><p className="red">{nfidSignInAuthError}</p></span>)
                                    } else { return null }
                                })()}


                            <div className="link">
                                <p>Don't have an account yet?<a onClick={handleSignUpClick} className="signup-link"> Sign Up</a></p>
                            </div>

                            <div className="internet-identity" onClick={handleSignInAuthWithII}>
                                {isSigningInAuth ? (<span className="animated-dots">
                                    <span className="internet-identity-text">Authenticating</span><span className="dots"></span></span>) : (
                                <> <span className="internet-identity-text">Sign In with Internet Identity</span></>)}
                            </div>

                            <div className="nfid" onClick={handleSignInAuthWithNFID}>
                                {nfidIsSigningInAuth ? (<span className="animated-dots">
                                    <span className="nfid-text">Authenticating</span><span className="dots"></span></span>) : (
                                <> <span className="nfid-text">Sign In with NFID</span></>)}
                            </div>

                        </form>

                    </div>

                </div>
            </>

        ):(

            <div className="loading-input fadeInLoader"><i className='bx bx-loader-circle bx-spin' ></i></div>

	    )} 
    </>
    )
}

export default Home