import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, updateUserAction } from '../../actions'
import Button from '../../components/Button'
import Input from '../../components/common/Input'
import Layout from '../../components/Layout'
import { AWS_FOLDER, API_CONFIG } from '../../config'
import './style.css'
const Profile = () => {

    const dispatch = useDispatch()
    const { user, loadingUpdate } = useSelector(state => state.auth)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')
    const [fileUpload, setFileUpload] = useState([])
    const [uploadIMG, setUploadIMG] = useState(true)
    const [previewAvatar, setPreviewAvatar] = useState(null)

    const handleUpdateProfile = () => {
        setFirstName(user?.profile?.firstName)
        setLastName(user?.profile?.lastName)
        setAddress(user?.profile?.address)
        setCity(user?.profile?.city)
        setContact(user?.profile?.phone)
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
                    contact
                }
            }
        }))
    }

    const handleUploadFile = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            fileUpload.push(file[i])
            setFileUpload(
                fileUpload
            )
        }
        setPreviewAvatar(URL.createObjectURL(e.target.files[0]))
        setUploadIMG(!uploadIMG)
    }

    const _uploadAvatar = () => {
        // const params = { userId: user._id }
        // const form = new FormData()
        // for (let file of fileUpload) {
        //     form.append('profilePicture', file)
        // }
        // swal({
        //     title: "Are you sure?",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // })
        //     .then((willChange) => {
        //         if (willChange) {
        //             dispatch(uploadAvatar(params, form))
        //             setPreviewAvatar(null)
        //             setUploadIMG(!uploadIMG)
        //         } else {
        //             setPreviewAvatar(null)
        //             setUploadIMG(!uploadIMG)
        //         }
        //     });

    }

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-lg-4">
                            <div class="card">

                                <div className="container-avatar" style={{ cursor: 'pointer' }}>
                                    <label for="file-input">
                                        {
                                            previewAvatar ?
                                                <img className="card-img-top" alt="Card image cap"
                                                    src={previewAvatar} /> :
                                                <img src={`${AWS_FOLDER.IMAGE}${user?.profile?.avatar}`}
                                                    className="card-img-top" alt="Card image cap" />
                                        }

                                        <i aria-hidden="true" for="input-upload-avatar" className="icon-camera fa fa-camera"></i>
                                    </label>
                                    <input id="file-input" type="file" onChange={handleUploadFile} />
                                </div>
                                <button className="btn btn-light waves-effect waves-light m-1" disabled={uploadIMG} style={uploadIMG ? { cursor: 'no-drop' } : null} onClick={_uploadAvatar}>Change avatar</button>
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
                                                value={contact}
                                                placeholder={'Contact'}
                                                onChange={(e) => setContact(e.target.value)}
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
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label"></label>
                                                <div class="col-lg-9">
                                                    <Button
                                                        status='light'
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
