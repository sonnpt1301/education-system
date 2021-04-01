import React from 'react'
import { NavLink } from 'react-router-dom'

const ResetPassword = () => {
    return (
        <div class="card card-authentication1 mx-auto my-5">
            <div class="card-body">
                <div class="card-content p-2">
                    <div class="card-title text-uppercase pb-2">Reset Password</div>
                    <p class="pb-2">Please enter your email address. You will receive a link to create a new password via email.</p>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmailAddress" class="">Email Address</label>
                            <div class="position-relative has-icon-right">
                                <input type="text" id="exampleInputEmailAddress" class="form-control input-shadow" placeholder="Email Address" />
                                <div class="form-control-position">
                                    <i class="icon-envelope-open"></i>
                                </div>
                            </div>
                        </div>

                        <button type="button" class="btn btn-warning btn-block mt-3">Reset Password</button>
                    </form>
                </div>
            </div>
            <div class="card-footer text-center py-3">
                <p class="text-dark mb-0">Return to the <NavLink to="/login">Log in</NavLink></p>
            </div>
        </div>
    )
}

export default ResetPassword
