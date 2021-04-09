import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import { Col, Figure, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { createCourseAction, getListCourseAction, joinCourseAction, sendRequestToJoinCourseAction } from '../../actions'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/common/Input'
import { Loader } from '../../components/common/Loader'
import Message from '../../components/common/Message'
import Modal from '../../components/common/Modal'
import Layout from '../../components/Layout'
import { AWS_FOLDER } from '../../config'
import './style.css'

const Course = ({ location }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {
        courseList,
        loading,
        error,
        loadingSendRequest,
        loadingJoinCourse,
        isJoin,
        errorJoinCourse,
        loadingCreate,
        errorCreate
    } = useSelector(state => state.course)
    const { categoryList } = useSelector(state => state.category)
    const { user } = useSelector(state => state.auth)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bgImage, setBgImage] = useState({})
    const [previewBgImage, setPreviewBgImage] = useState(null)
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [total, setTotal] = useState(0)

    const [filter, setFilter] = useState(['on process', 'accomplish'])
    const [message, setMessage] = useState('')
    const [joinCourseModal, setJoinCourseModal] = useState(false)
    const [secretKey, setSecretKey] = useState('')

    const [successMessage, setSuccessMessage] = useState('')
    const [createCourseModal, setCreateCourseModal] = useState(false)

    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };


    const handleCloseJoinCourseModal = () => {
        setJoinCourseModal(false)
        history.push('/course')
    }

    const joinCourseHandler = () => {
        const query = qs.parse(location.search)
        dispatch(joinCourseAction({
            body: {
                courseId: query.courseId,
                secretKey: secretKey
            }
        }))
    }

    const handleUploadBackgroundImage = (e) => {
        setBgImage(e.target.files[0])
        setPreviewBgImage(URL.createObjectURL(e.target.files[0]))
    }

    const createCourseHandler = () => {
        dispatch(createCourseAction({
            body: {
                title,
                description,
                bgImage,
                fromDate,
                toDate,
                category: location.state.categoryId
            },
            bgImage
        }))
    }

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setMessage('Create course successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingCreate, errorCreate]);

    const resetField = () => {
        setTitle('')
        setDescription('')
        setBgImage({})
        setPreviewBgImage(null)
        setFromDate('')
        setToDate('')
        setCreateCourseModal(false)
        setMessage('')
    }

    useEffect(() => {
        if (!loadingJoinCourse && !errorJoinCourse && isJoin?.isJoined === true) {
            setTimeout(() => {
                setMessage('')
                setSuccessMessage('Join course successful. Please close this modal and refresh this page to join your course!')
            }, 1000);
        }
    }, [loadingJoinCourse, errorJoinCourse])

    useEffect(() => {
        if (error && loadingSendRequest === false) {
            setTimeout(() => {
                setMessage('The secret key has been sending to your email. Please check your email!')
            }, 4000);
        }
    }, [error, loadingSendRequest])

    useEffect(() => {
        if (location.search) {
            const query = qs.parse(location.search)
            if (query.joinCourse === 'true') {
                setJoinCourseModal(true)
                dispatch(sendRequestToJoinCourseAction({
                    body: {
                        courseId: query.courseId
                    }
                }))
            }
        }
    }, [location])


    useEffect(() => {
        courseList && setTotal(courseList?.total || 0);
    }, [courseList]);


    useEffect(() => {
        if (location?.state?.categoryId) {
            dispatch(getListCourseAction({
                status: filter,
                limit,
                skip,
                category: location.state.categoryId
            }))
        }
    }, [location, filter, skip, loadingJoinCourse, loadingCreate])



    return (
        <Layout>
            <Modal
                modalTitle={'Join course'}
                show={joinCourseModal}
                handleClose={handleCloseJoinCourseModal}
                onHide={handleCloseJoinCourseModal}
            >
                {successMessage && <Message variant='warning'>{successMessage}</Message>}
                {message && <Message>{message}</Message>}
                {errorJoinCourse && <Message variant='danger'>{errorJoinCourse}</Message>}
                {loadingSendRequest && <Loader />}
                {loadingJoinCourse && <Loader />}
                {
                    !isJoin?.isJoined && (
                        <Input
                            label='Secret key'
                            placeholder='Enter secret key here...'
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            important
                        />
                    )
                }
                {
                    isJoin?.isJoined === true ? (
                        <Button
                            status='success'
                            icon='fa fa-window-close'
                            long
                            onClick={handleCloseJoinCourseModal}
                        >
                            Close
                        </Button>
                    ) : <Button
                        status='success'
                        icon='zmdi zmdi-plus-circle'
                        long
                        onClick={joinCourseHandler}
                    >
                        Join
                        </Button>
                }
            </Modal>


            <Modal
                modalTitle={'New course'}
                show={createCourseModal}
                handleClose={() => setCreateCourseModal(false)}
                onHide={() => setCreateCourseModal(false)}
                size='lg'
            >
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {message && <Message variant="success">{message}</Message>}
                <Input
                    label='Title'
                    placeholder='Enter title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    important
                />
                <Input
                    label='Description'
                    type='textarea'
                    row={5}
                    placeholder='Enter description...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    important
                />
                <Row>
                    <Col sm={6}>
                        <Input
                            label='Start date'
                            type='date'
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            important
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label='End date'
                            type='date'
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            important
                        />
                    </Col>
                </Row>
                <Input
                    type='file'
                    label='Background Image'
                    name={bgImage}
                    onChange={handleUploadBackgroundImage}
                    accept='image/*'
                    lang="en"
                />
                <Figure>
                    <Figure.Image
                        height={180}
                        alt="171x180"
                        src={previewBgImage ? previewBgImage : 'https://edusys-project.s3-ap-southeast-1.amazonaws.com/image/course.jpg'}
                    />
                    <Figure.Caption style={{ textAlign: 'center' }}>
                        {previewBgImage ? 'New background image' : 'Default background image'}
                    </Figure.Caption>
                </Figure>
                <Button
                    status='info'
                    icon='fa fa-plus-circle'
                    onClick={createCourseHandler}
                    long
                >
                    Create
                </Button>
            </Modal>

            {loading && <Loader />}
            <div class="content-wrapper">
                <div class="container-fluid">
                    <h4>Courses</h4>
                    <div class="row">
                        <div class="col-10">
                            {
                                user.profile.role === 'tutors' && (
                                    <Button
                                        status='info'
                                        icon='fa fa-plus-circle'
                                        onClick={() => setCreateCourseModal(true)}
                                    >
                                        New Course
                                    </Button>
                                )
                            }
                        </div>
                        <div class="col-2" style={{ paddingLeft: '10px' }}>
                            Choose courses
                            <label>
                                <select name="default-datatable_length" aria-controls="default-datatable" class="form-control form-control-sm"
                                    value={filter} onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option key="" value={''}>All</option>
                                    <option key="on process" value={'on process'}>On process</option>
                                    <option key="accomplish" value={'accomplish'}>Accomplish</option>
                                </select>
                            </label>

                        </div>
                    </div>
                    <div class="row">
                        {
                            courseList?.data?.length > 0 ? courseList.data.map(course => (
                                <div class="col-12 col-lg-4 card-zoom">
                                    <Card
                                        title={course.title}
                                        description={course.description}
                                        avatar={`${AWS_FOLDER.IMAGE}${course.createdBy.profile.avatar}`}
                                        createdBy={course.createdBy.profile.firstName + ' ' + course.createdBy.profile.lastName}
                                        status={(course.status === 'on process' && 'success') || (course.status === 'accomplish' && 'info')}
                                        children={(course.status === 'on process' && 'On process') || (course.status === 'accomplish' && 'Accomplish')}
                                        state={course._id}
                                        totalUser={course.totalUser}
                                        courseImg={`${AWS_FOLDER.IMAGE}${course.bgImage}`}
                                    />
                                </div>
                            )) : <div className='row'>No data</div>
                        }
                    </div>
                    {
                        courseList?.data?.length > 0 && (
                            <div class="row">
                                <div class="col-sm-12 col-md-5">

                                    <div class="dataTables_info" id="default-datatable_info" role="status" aria-live="polite">
                                        Showing {limit} of {total} courses
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
                        )
                    }

                </div>
            </div>
        </Layout>
    )
}

export default Course
