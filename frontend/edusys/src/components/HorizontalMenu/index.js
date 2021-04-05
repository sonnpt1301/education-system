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
                        <i class="fa fa-dashboard" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="fa fa-dashboard" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/course">
                                Courses
                            </NavLink>
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default HorizontalMenu
