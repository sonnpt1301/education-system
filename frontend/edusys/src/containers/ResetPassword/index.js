import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPasswordAction, resetPasswordAction } from '../../actions/auth.action'
import { Loader } from '../../components/common/Loader'
import Message from '../../components/common/Message'
const ResetPassword = ({ location }) => {
    const dispatch = useDispatch()
    const { loading, error, loadingSendRequest, loadingResetPassword, errorSendRequest, errorResetPassword } = useSelector(state => state.auth)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setCreateMessage] = useState('')

    useEffect(() => {
        if (!loadingSendRequest && !errorSendRequest) {
            setCreateMessage('Send email successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingSendRequest, errorSendRequest,]);

    const resetField = () => {
        setEmail('')
    }

    const resetPasswordHandler = () => {
        dispatch(resetPasswordAction({
            email
        }))
    }

    const createNewPasswordHandler = () => {
        dispatch(createNewPasswordAction({
            newPass: newPassword,
            confirmedPass: confirmPassword,
            token: location.search.split('=')[1],
        }))
    }

    const resetPasswordComponent = () => {
        return (
            <div class="card card-authentication1 mx-auto my-5">
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="card-title text-uppercase pb-2">Reset Password</div>
                        <p class="pb-2">Please enter your email address. You will receive a link to create a new password via email.</p>
                        {
                            message ? (
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmailAddress" class="">Email Address</label>
                                    {error && <Message variant="danger">{error}</Message>}
                                    <div class="position-relative has-icon-right">
                                        <input type="text" id="exampleInputEmailAddress" class="form-control input-shadow" placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div class="form-control-position">
                                            <i class="icon-envelope-open"></i>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-warning btn-block mt-3" onClick={resetPasswordHandler}>Reset Password</button>
                            </form>
                        ) : <Message variant='success'>{message}</Message>
                        }
                    </div>
                </div>
                <div class="card-footer text-center py-3">
                    <p class="text-dark mb-0">Return to the <NavLink to="/login">Log in</NavLink></p>
                </div>
            </div>
        )
    }

    const createNewPasswordComponent = () => {
        return (
            <div class="card card-authentication1 mx-auto my-5">
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="card-title text-uppercase pb-2">Reset Password</div>
                        <p class="pb-2">Please enter your email address. You will receive a link to create a new password via email.</p>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmailAddress" class="">New Password</label>
                                <div class="position-relative has-icon-right">
                                    <input type="password" id="exampleInputEmailAddress" class="form-control input-shadow" placeholder="Email Address"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-envelope-open"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmailAddress" class="">Confirm Password</label>
                                <div class="position-relative has-icon-right">
                                    <input type="password" id="exampleInputEmailAddress" class="form-control input-shadow" placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-envelope-open"></i>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="btn btn-warning btn-block mt-3" onClick={createNewPasswordHandler}>Reset Password</button>
                        </form>
                    </div>
                </div>
                <div class="card-footer text-center py-3">
                    <p class="text-dark mb-0">Return to the <NavLink to="/login">Log in</NavLink></p>
                </div>
            </div>
        )
    }

    return (
        <>
            { loadingSendRequest && <Loader />}
            {location.search ? createNewPasswordComponent() : resetPasswordComponent()}
        </>
    )
}

export default ResetPassword
