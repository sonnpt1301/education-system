import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AWS_FOLDER } from '../../config'
import { logoutAction } from '../../actions'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const { user } = useSelector(state => state.auth)


    const logout = () => {
        dispatch(logoutAction())
        history.push('/login');
    }

    return (
        <header class="topbar-nav">
            <nav class="navbar navbar-expand">
                <ul class="navbar-nav mr-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void();">
                            <div class="media align-items-center">
                                <NavLink to='/' style={{ color: 'black' }}>
                                    <img src='https://edusys-project.s3-ap-southeast-1.amazonaws.com/image/logo.png' class="logo-icon" alt="logo icon" />
                                </NavLink>
                                <div class="media-body">
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>

                <ul class="navbar-nav align-items-center right-nav-link">
                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">
                            <span class="user-profile"><img src={`${AWS_FOLDER.IMAGE}${user?.profile?.avatar}`} class="img-circle" alt="user avatar" /></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li class="dropdown-item user-details">
                                <a href="javaScript:void();">
                                    <NavLink to='/profile' style={{ color: 'black' }}>
                                        <div class="media" style={{ padding: '10px' }}>
                                            <div class="avatar"><img class="align-self-start mr-3" src={`${AWS_FOLDER.IMAGE}${user?.profile?.avatar}`} alt="user avatar" /></div>
                                            <div class="media-body">
                                                <h6 class="mt-2 user-title">{user?.profile?.firstName + ' ' + user?.profile?.lastName}</h6>
                                                <p class="user-subtitle">{user?.email}</p>
                                            </div>
                                        </div>
                                    </NavLink>

                                </a>
                            </li>
                            <li class="dropdown-divider"></li>
                            <li class="dropdown-item">
                                <div style={{ cursor: 'pointer' }}>
                                    <NavLink to='/message' style={{ color: 'black' }}>
                                        <i class="icon-envelope mr-2"></i> Inbox
                                        </NavLink>
                                </div>
                            </li>
                            <li class="dropdown-divider"></li>
                            <li class="dropdown-item"><i class="icon-settings mr-2"></i> Setting</li>
                            <li class="dropdown-divider"></li>
                            <li className="dropdown-item"><div onClick={logout} style={{ cursor: 'pointer' }}><i className="icon-power mr-2"></i> Logout</div></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header