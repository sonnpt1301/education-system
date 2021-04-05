import React from 'react'
import { NavLink } from 'react-router-dom'
import Badge from '../../components/Badge'
import './style.css'

const Card = ({ title, description, avatar, createdBy, children, status, state }) => {
    return (
        <div class="card">
            <img src="https://via.placeholder.com/800x500" class="card-img-top" alt="Card image cap" />
            <div class="card-body">
                <h4 class="card-title">{title}
                    <Badge status={status}>{children}</Badge>
                </h4>
                <h6>{description}</h6>
                <hr />
                <div class="user-details">
                    <div class="media align-items-center">
                        <div class="avatar">
                            <img class="mr-3 side-user-img" src={avatar} alt="user avatar" style={{ marginRight: '5px' }} />
                        </div>
                        <div class="media-body">
                            <h6 class="side-user-name">{createdBy}</h6>
                        </div>
                        <div class="group-user">
                            <img src="images/group-profile-users.svg" class="user-icon" alt="user avatar" /> <span class="count-user">35</span>
                        </div>
                        <NavLink to={{
                            pathname: `course-detail/${state}`,
                            state: { _id: state}
                        }}
                            className="waves-effect">
                            <div style={{ cursor: 'pointer' }}>
                                <img src="images/unnamed-removebg-preview.png" class="door-icon" alt="user avatar" />
                            </div>
                        </NavLink>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
