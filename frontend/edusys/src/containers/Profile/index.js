import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, updateAvatarAction, updateUserAction } from '../../actions'
import Button from '../../components/Button'
import Input from '../../components/common/Input'
import Layout from '../../components/Layout'
import { AWS_FOLDER, API_CONFIG } from '../../config'
import swal from 'sweetalert'
import './style.css'
import Message from '../../components/common/Message'
import { Loader } from '../../components/common/Loader'
import { getUserCourseInfoAction } from '../../actions/userCourse.action'
import Card from '../../components/Card'
import { NavLink } from 'react-bootstrap'

const Profile = () => {

    const dispatch = useDispatch()
    const { user, loadingUpdate, errorUpdate } = useSelector(state => state.auth)
    const { userCourse } = useSelector(state => state.userCourse)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [fileUpload, setFileUpload] = useState({})
    const [uploadIMG, setUploadIMG] = useState(true)
    const [previewAvatar, setPreviewAvatar] = useState(null)
    const [message, setMessage] = useState('')

    const handleUpdateProfile = () => {
        setFirstName(user?.profile?.firstName)
        setLastName(user?.profile?.lastName)
        setAddress(user?.profile?.address)
        setCity(user?.profile?.city)
        setPhone(user?.profile?.phone)
    }

    const updateUserProfileHandler = () => {
        dispatch(updateUserAction({
            id: user._id,
            body: {
                profile: {
                    firstName,
                    lastName,
                    address,
                    city,
                    phone
                }
            }
        }))
    }

    const handleUploadFile = (e) => {
        const file = e.target.files[0]
        setFileUpload(file)
        setPreviewAvatar(URL.createObjectURL(e?.target?.files[0]))
        setUploadIMG(false)
    }

    const handleCancelUploadAvatar = () => {
        setPreviewAvatar(null)
        setUploadIMG(true)
        setFileUpload({})
    }

    const updateAvatarHandler = () => {
        dispatch(updateAvatarAction({
            id: user._id,
            file: fileUpload
        })).then(() => {
            setPreviewAvatar(null)
            setUploadIMG(true)
        })
    }


    const resetField = () => {
        setMessage('')
    }

    useEffect(() => {
        if (!loadingUpdate && !errorUpdate && user._id) {
            setMessage('Update profile successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingUpdate, errorUpdate]);

    useEffect(() => {
        handleUpdateProfile()
        dispatch(getUserCourseInfoAction())
    }, [dispatch, loadingUpdate])


    return (
        <Layout>
            {loadingUpdate === true && <Loader />}
            {message && <Message variant='success'>{message}</Message>}
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-lg-4">
                            <div class="card">
                                <div className="container-avatar" style={{ cursor: 'pointer' }}>
                                    <label for="file-input">
                                        <img src={previewAvatar ? previewAvatar : `${AWS_FOLDER.IMAGE}${user?.profile?.avatar}`}
                                            className="card-img-top" alt="Card image cap" />

                                        <i aria-hidden="true" for="input-upload-avatar" className="icon-camera fa fa-camera"></i>
                                    </label>
                                    <input id="file-input" type="file" onChange={handleUploadFile} />
                                </div>
                                <button className="btn btn-info waves-effect waves-info m-1" disabled={uploadIMG} style={uploadIMG ? { cursor: 'no-drop' } : null} onClick={updateAvatarHandler}>Change avatar</button>
                                {
                                    !uploadIMG && (
                                        <Button
                                            status='light'
                                            onClick={handleCancelUploadAvatar}
                                        >
                                            Cancel
                                        </Button>
                                    )
                                }
                                <div className="card-body">
                                    <div>Full Name: <h5 className="card-title">{user?.profile?.firstName + ' ' + user?.profile?.lastName}</h5></div>
                                    <div>Role: <h5 className="card-title">{(user?.profile?.role)?.toUpperCase()}</h5></div>
                                </div>
                                {/* <ul class="list-group list-group-flush list shadow-none">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Total Contribution<span class="badge badge-info badge-pill">14</span></li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Total Published Contribution<span class="badge badge-success badge-pill">2</span></li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Total Pending Contribution<span class="badge badge-danger badge-pill">1</span></li>
                                </ul> */}
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <ul class="nav nav-tabs nav-tabs-primary top-icon nav-justified">
                                        <li class="nav-item">
                                            <a href="javascript:void();" data-target="#profile" data-toggle="pill" class="nav-link active"><i class="icon-user"></i> <span class="hidden-xs">Profile</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link" onClick={handleUpdateProfile}><i class="icon-note"></i> <span class="hidden-xs">Edit</span></a>
                                        </li>
                                    </ul>
                                    <div class="tab-content p-3">
                                        <div class="tab-pane active" id="profile">
                                            <h5 class="mb-3" style={{ textAlign: 'center' }}>User Profile</h5>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6>Full Name</h6>
                                                    <p>
                                                        {user?.profile?.firstName + ' ' + user?.profile?.lastName}
                                                    </p>
                                                    <h6>Phone</h6>
                                                    <p>
                                                        {user?.profile?.phone}
                                                    </p>
                                                    <h6>Address</h6>
                                                    <p>
                                                        {user?.profile?.address}
                                                    </p>
                                                    <h6>City</h6>
                                                    <p>
                                                        {user?.profile?.city}
                                                    </p>
                                                </div>
                                            </div>
                                            {
                                                user.profile.role === 'student' && (
                                                    <>
                                                        <h5 class="mb-3" style={{ textAlign: 'center' }}>Participated Course</h5>
                                                            {
                                                                userCourse.length > 0 ? userCourse.map((info) => (
                                                                    <div class="col-12 col-lg-4">
                                                                        <div class="card mb-3" style={{ cursor: 'pointer' }}>
                                                                            <img
                                                                                class="card-img-top"
                                                                                src={`${AWS_FOLDER.IMAGE}${info.course.bgImage}`}
                                                                                alt="course_image"
                                                                                style={{ height: '150px' }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )) : <div style={{ textAlign: 'center' }}>
                                                                    <i>You haven't join any course</i>
                                                                </div>
                                                            }
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div class="tab-pane" id="edit">
                                            <Input
                                                label="First Name"
                                                placeholder={'Enter name'}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <Input
                                                label="Last Name"
                                                value={lastName}
                                                placeholder={'Last Name'}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <Input
                                                label="Contact"
                                                value={phone}
                                                placeholder={'Contact'}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <Input
                                                label="Address"
                                                value={address}
                                                placeholder={'Address'}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            <Input
                                                label="City"
                                                value={city}
                                                placeholder={'City'}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <div class="form-group pull-right">
                                                <div>
                                                    <Button
                                                        status='light'
                                                        type='reset'
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        status='info'
                                                        onClick={updateUserProfileHandler}
                                                    >
                                                        Update
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
