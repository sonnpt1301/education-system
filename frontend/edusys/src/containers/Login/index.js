import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { loginAction } from '../../actions'
import { Loader } from '../../components/common/Loader'
import Message from '../../components/common/Message'

const Login = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { user } = auth

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)

    const userLogin = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        console.log(user)
        dispatch(loginAction(user))
    }

    const handleRememberPassword = () => {
        setRememberPassword(!rememberPassword)
        if (rememberPassword && password !== '' && email !== '') {
            localStorage.setItem('remember_email', JSON.stringify(email))
            localStorage.setItem('remember_password', JSON.stringify(password))
        } else {
            localStorage.removeItem('remember_email')
            localStorage.removeItem('remember_password')
        }
    }

    if (auth.authenticate) {
        return (<Redirect to={`/`} />)
    }

    return (
        <>
            {auth.authenticating && <Loader />}
            <div class="card card-authentication1 mx-auto my-5">
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="text-center">
                            <img src="https://edusys-project.s3-ap-southeast-1.amazonaws.com/image/logo.png" style={{ width: '110px' }} alt="logo icon" />
                        </div>
                        <div class="card-title text-uppercase text-center py-3">Sign In</div>
                        <form onSubmit={userLogin}>
                            <div class="form-group">
                                <label for="exampleInputUsername" class="sr-only">Username</label>
                                <div class="position-relative has-icon-right">
                                    <input type="text" id="exampleInputUsername" className="form-control input-shadow" placeholder="Enter Username"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword" class="sr-only">Password</label>
                                <div class="position-relative has-icon-right">
                                    <input type="password" id="exampleInputPassword" className="form-control input-shadow" placeholder="Enter Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {auth.error && <Message variant={'danger'}>{auth.error}</Message>}
                            </div>
                            <div class="form-row">
                                <div class="form-group col-6">
                                    <div class="icheck-material-primary">
                                        <input type="checkbox" id="user-checkbox" checked={rememberPassword}
                                            onClick={handleRememberPassword}
                                        />
                                        <label for="user-checkbox">Remember me</label>
                                    </div>
                                </div>
                                <div class="form-group col-6 text-right">
                                    <NavLink to="/reset-password">
                                        Reset Password
                                </NavLink>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" onClick={() => { }}>Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
