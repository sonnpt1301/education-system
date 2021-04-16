import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Badge from '../../components/Badge'
import './style.css'

const Card = ({ title, description, avatar, createdBy, children, status, state, totalUser, courseImg }) => {

    const { user } = useSelector(state => state.auth)

    return (
        <NavLink to={{
            pathname: `course-detail`,
            state: { _id: state }
        }}
            className="waves-effect">
            <div class="card" style={{ cursor: 'pointer' }}>
                <img src={courseImg} style={{ height: '350px', width: '100%' }} class="card-img-top" alt="Card image cap" />
                <div class="card-body">
                    <h4 class="card-title">{title}</h4>
                    <div>
                        <Badge status={status}>{children}</Badge>
                    </div>
                    <h6 className='card-description-limit'>{description}</h6>
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
                                <img src="images/group-profile-users.svg" class="user-icon" alt="user avatar" /> <span class="count-user">{totalUser}</span>
                            </div>
                            <img src="images/unnamed-removebg-preview.png" class="door-icon" alt="user avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default Card
