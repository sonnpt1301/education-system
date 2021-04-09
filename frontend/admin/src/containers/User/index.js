import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { createUserAction, deleteUserAction, getListUserAction, updateUserAction } from '../../actions'
import Input from '../../components/common/Input'
import Loader from '../../components/common/Loader'
import Message from '../../components/common/Message'
import Modal from '../../components/common/Modal'
import Layout from '../../components/Layout'
import CountUp from 'react-countup'
import Button from '../../components/Button'

const User = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')


    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [total, setTotal] = useState(0)

    const [createMessage, setCreateMessage] = useState('')

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleCloseCreateModal = () => setShowCreateModal(false)
    const handleShowCreateModal = () => setShowCreateModal(true)

    const handleCloseUpdateModal = () => setShowUpdateModal(false)

    const handleCloseDeleteModal = () => setShowDeleteModal(false)




    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };

    const dispatch = useDispatch()
    const {
        userList,
        loading,
        loadingCreate,
        errorCreate,
        loadingUpdate,
        errorUpdate,
        loadingDelete,
        errorDelete
    } = useSelector(state => state.user)

    const roleBased = [
        { name: 'tutors' },
        { name: 'student' },
    ]

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setCreateMessage('Create new user successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingCreate, errorCreate,]);

    useEffect(() => {
        if (!loadingUpdate && !errorUpdate) {
            setCreateMessage('Update user successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingUpdate, errorUpdate,]);

    useEffect(() => {
        if (!loadingDelete && !errorDelete) {
            setCreateMessage('Delete user successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingDelete, errorDelete,]);

    const createUserHandler = (e) => {
        e.preventDefault()
        setCreateMessage('')
        dispatch(createUserAction({
            email,
            password,
            profile: {
                firstName,
                lastName,
                role,
                address,
                city,
                phone,
            },
        }))
    }

    const updateUserHandler = (e) => {
        e.preventDefault()
        setCreateMessage('')
        dispatch(updateUserAction({
            id: userId,
            body: {
                profile: {
                    firstName,
                    lastName,
                    role,
                    address,
                    city,
                    phone,
                }
            }
        }))
    }

    const deleteUserHandler = () => {
        setCreateMessage('')
        dispatch(deleteUserAction(userId))
    }

    const resetField = () => {
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setCity('')
        setAddress('')
        setPhone('')
        setRole('')
        setUserId('')
        setCreateMessage('')
        setShowCreateModal(false)
        setShowUpdateModal(false)
        setShowDeleteModal(false)
    }

    const handleShowUpdateModal = (e, id) => {
        const user = userList.data.find(usr => usr._id === id)
        setUserId(user._id)
        setEmail(user.email)
        setPassword(user.password)
        setFirstName(user.profile.firstName)
        setLastName(user.profile.lastName)
        setRole(user.profile.role)
        setCity(user.profile.city)
        setAddress(user.profile.address)
        setPhone(user.profile.phone)
        setShowUpdateModal(true)
    }

    const handleShowDeleteModal = (e, id) => {
        const user = userList.data.find(usr => usr._id === id)
        console.log(user)
        setUserId(user._id)
        setShowDeleteModal(true)
    }

    useEffect(() => {
        dispatch(getListUserAction({
            limit,
            skip,
            isDeleted: false,
        }))
    }, [limit, skip, loadingCreate, loadingUpdate, loadingDelete])

    useEffect(() => {
        userList && setTotal(userList?.total || 0);
    }, [userList]);

    return (
        <Layout>
            {loading && <Loader />}

            {/* Create Modal */}
            <Modal
                modalTitle={'Create User'}
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                onHide={handleCloseCreateModal}
            >
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {createMessage && <Message variant="success">{createMessage}</Message>}
                <Row>
                    <Col sm={6}>
                        <Input
                            label="First Name"
                            placeholder={'Enter name'}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            important
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="Last Name"
                            value={lastName}
                            placeholder={'Last Name'}
                            onChange={(e) => setLastName(e.target.value)}
                            important
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Input
                            label="Phone"
                            value={phone}
                            placeholder={'Contact'}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="Email"
                            value={email}
                            placeholder={'Email'}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            important
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Input
                            label="Password"
                            type={'password'}
                            value={password}
                            placeholder={'Password'}
                            onChange={(e) => setPassword(e.target.value)}
                            important
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="Choose role"
                            type='select'
                            value={role}
                            options={roleBased}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder={'Role'}
                            important
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Input
                            label="Address"
                            value={address}
                            placeholder={'Address'}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="City"
                            value={city}
                            placeholder={'City'}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Col>
                </Row>

                <div className="form-group">
                    <button type="submit" className="btn btn-light px-5" onClick={createUserHandler}
                    ><i className="icon-lock"></i>
                    Create
                    </button>
                </div>
            </Modal>


            <Modal
                modalTitle={'Update User Information'}
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                onHide={handleCloseUpdateModal}
            >
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {createMessage && <Message variant="success">{createMessage}</Message>}
                <Row>
                    <Col sm={6}>
                        <Input
                            label="First Name"
                            placeholder={'Enter name'}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            important
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="Last Name"
                            value={lastName}
                            placeholder={'Last Name'}
                            onChange={(e) => setLastName(e.target.value)}
                            important
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Input
                            label="Phone"
                            value={phone}
                            placeholder={'Contact'}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="Email"
                            value={email}
                            placeholder={'Email'}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            disabled
                            style={{ cursor: 'not-allowed' }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Input
                            label="Password"
                            type={'password'}
                            value={password}
                            placeholder={'Password'}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled
                            style={{ cursor: 'not-allowed' }}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="Role"
                            type='select'
                            value={role}
                            options={roleBased}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder={'Role'}
                            important
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Input
                            label="Address"
                            value={address}
                            placeholder={'Address'}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label="City"
                            value={city}
                            placeholder={'City'}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Col>
                </Row>

                <div className="form-group">
                    <button type="submit" className="btn btn-light px-5" onClick={updateUserHandler}
                    ><i className="icon-lock"></i>
                    Update
                    </button>
                </div>
            </Modal>

            <Modal
                modalTitle='Are you sure to delete this user? This action can not be restored.'
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                onHide={handleCloseDeleteModal}
            >
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {createMessage && <Message variant="success">{createMessage}</Message>}
                <button type="submit" className="btn btn-light px-5" style={{ marginRight: '50px' }} onClick={handleCloseDeleteModal}
                ><i></i>
                    Cancel
                    </button>
                <button type="submit" className="btn btn-danger px-5" onClick={deleteUserHandler}
                ><i className="fa fa-trash"></i>
                    Delete Permanently
                    </button>
            </Modal>

            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row pt-2 pb-2">
                        <div class="col-sm-9">
                            <h4 class="page-title">User</h4>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col-lg-12">
                            <button type="button" className="btn btn-light waves-effect waves-light m-1" onClick={handleShowCreateModal}>Create User</button>
                            <div class="card">
                                <div class="card-header"><i class="fa fa-user-circle"></i> Total Users: <CountUp end={userList.total} /></div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-3">
                                                <div class="dataTables_length" id="default-datatable_length">
                                                    Show
                                                    <label>
                                                        <select name="default-datatable_length" aria-controls="default-datatable" class="form-control form-control-sm"
                                                            value={limit} onChange={(e) => setLimit(e.target.value)}
                                                        >
                                                            <option key="10" value={10}>10</option>
                                                            <option key="20" value={20}>20</option>
                                                        </select>
                                                    </label>
                                                        users
                                                </div>
                                            </div>
                                        </div>
                                        <table id="default-datatable" class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>City</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userList?.data && userList.data.map((usr, index) => (
                                                        <tr key={usr._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{usr.profile.firstName}</td>
                                                            <td>{usr.profile.lastName}</td>
                                                            <td>{usr.email}</td>
                                                            <td>{usr.profile.role}</td>
                                                            <td>{usr.profile.phone}</td>
                                                            <td>{usr.profile.address}</td>
                                                            <td>{usr.profile.city}</td>
                                                            <td>
                                                                <Button
                                                                    status='warning'
                                                                    icon='fa fa-edit'
                                                                    onClick={(e) => handleShowUpdateModal(e, usr._id)}
                                                                    small
                                                                />
                                                                <Button
                                                                    status='danger'
                                                                    icon='fa fa-trash-o'
                                                                    onClick={(e) => handleShowDeleteModal(e, usr._id)}
                                                                    small
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-5">
                            <div class="dataTables_info" id="default-datatable_info" role="status" aria-live="polite">
                                Showing {limit} of {total} users
                    </div>
                        </div>
                        <div class="col-sm-12 col-md-7">
                            <ReactPaginate
                                previousLabel={'< Previous'}
                                nextLabel={'Next >'}
                                breakLabel={'...'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                pageCount={Math.ceil(total / limit)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination'}
                                subContainerClassName={'page-item'}
                                activeClassName={'page-item active'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                pageClassNam={'page-item'}
                                pageLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default User
