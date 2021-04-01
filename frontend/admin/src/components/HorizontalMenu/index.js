import React from 'react'
import { NavLink } from 'react-router-dom'

const HorizontalMenu = () => {
    return (
        <nav>
            {/* <!-- Menu Toggle btn--> */}
            <div class="menu-toggle">
                <h3>Menu</h3>
                <button type="button" id="menu-btn">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>

            <ul id="respMenu" class="horizontal-menu">

                <li>
                    <a href="javascript:;">
                        <i class="zmdi zmdi-view-dashboard" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/">
                                Dashboard
                            </NavLink>
                        </span>
                    </a>
                </li>

                <li>
                    <a href="javascript:;">
                        <i class="zmdi zmdi-view-dashboard" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/user">
                                User
                            </NavLink>
                        </span>
                    </a>
                </li>

                <li>
                    <a href="javascript:;">
                        <i class="zmdi zmdi-view-dashboard" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/category">
                                Category
                            </NavLink>
                        </span>
                    </a>
                </li>

                <li>
                    <a href="javascript:;">
                        <i class="zmdi zmdi-view-dashboard" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/course">
                                Course
                            </NavLink>
                        </span>
                    </a>
                </li>



            </ul>
        </nav>
    )
}

export default HorizontalMenu
