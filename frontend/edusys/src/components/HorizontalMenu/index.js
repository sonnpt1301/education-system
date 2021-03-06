import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { getListCategoryAction } from '../../actions'
import './style.css'

const HorizontalMenu = () => {

    const dispatch = useDispatch()
    const { categoryList } = useSelector(state => state.category)
    useEffect(() => {
        dispatch(getListCategoryAction())
    }, [])

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

            <ul id="respMenu" class="horizontal-menu" style={{ display: 'flex', justifyContent: 'center' }}>
                <li>
                    <a href="javascript:;">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="zmdi zmdi-card-travel"></i>
                        <span class="title" style={{ color: 'black' }}>Categories</span>
                        
                    </a>
                    <ul>
                        {
                            categoryList?.category && categoryList.category.map((category, index) => (
                                <li key={index}>
                                    <div>
                                        <NavLink to={{
                                            pathname: 'course',
                                            state: { categoryId: category._id }
                                        }}
                                            className="waves-effect"
                                        >
                                            {category.name}
                                        </NavLink>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <span class="title">
                            <NavLink to="/about">
                                About
                            </NavLink>
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default HorizontalMenu
