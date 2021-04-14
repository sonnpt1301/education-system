import React, { useEffect, useState } from 'react'
import { Col, Figure, Row, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetailAction, updateCourseAction, uploadVideoAction } from '../../../actions'
import Layout from '../../../components/Layout'
import { AWS_FOLDER } from '../../../config'
import { Loader } from '../../../components/common/Loader'
import Blog from '../../Blog'
import Activity from '../../Activity'
import { useHistory } from 'react-router'
import { formatDate } from '../../../utils'
import Button from '../../../components/Button'
import Modal from '../../../components/common/Modal'
import Input from '../../../components/common/Input'
import Message from '../../../components/common/Message'
import ReactPlayer from 'react-player'

const CourseDetail = ({ match }) => {

    const dispatch = useDispatch()
    const {
        courseDetail,
        loadingCourseDetail,
        error,
        loadingUpdate,
        errorUpdate,
        loadingUploadVideo,
        errorUploadVideo,
    } = useSelector(state => state.course)
    const { user } = useSelector(state => state.auth)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bgImage, setBgImage] = useState({})
    const [previewBgImage, setPreviewBgImage] = useState(null)
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const [name, setName] = useState('')
    const [videoFile, setVideoFile] = useState({})

    const [updateCourseModal, setUpdateCourseModal] = useState(false)
    const [uploadVideoModal, setUploadVideoModal] = useState(false)

    const [message, setMessage] = useState('')

    const [currentCourse, setCurrentCourse] = useState({})
    const [tab, setTab] = useState(0)
    const history = useHistory()
    const [courseId, setCourseId] = useState(history?.location?.state?._id)


    const [showListUserInCourse, setShowListUserInCourse] = useState(false)

    const handleUploadBackgroundImage = (e) => {
        setBgImage(e.target.files[0])
        setPreviewBgImage(URL.createObjectURL(e.target.files[0]))
    }


    const handleUploadVideo = (e) => {
        const file = e.target.files[0]
        setVideoFile(file)
    }

    const uploadVideoHandler = () => {
        dispatch(uploadVideoAction({
            body: {
                name: name,
                course: courseId
            },
            file: videoFile
        }))
    }

    const handleShowUpdateCourseModal = () => {
        setUpdateCourseModal(true)
        setTitle(currentCourse.title)
        setDescription(currentCourse.description)
        setBgImage(`${AWS_FOLDER.IMAGE}${currentCourse.bgImage}`)
        setFromDate(currentCourse.fromDate.split('T')[0])
        setToDate(currentCourse.toDate.split('T')[0])
    }

    const updateCourseHandler = () => {
        dispatch(updateCourseAction({
            id: currentCourse._id,
            body: {
                title,
                description,
                bgImage,
                fromDate,
                toDate,
            },
            bgImage
        }))
    }

    useEffect(() => {
        if (!loadingUpdate && !errorUpdate) {
            setMessage('Update course successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingUpdate, errorUpdate]);

    useEffect(() => {
        if (!loadingUploadVideo && !errorUploadVideo) {
            setMessage('Upload video successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingUploadVideo, errorUploadVideo]);

    const resetField = () => {
        setTitle('')
        setDescription('')
        setBgImage({})
        setPreviewBgImage(null)
        setFromDate('')
        setToDate('')
        setUpdateCourseModal(false)
        setMessage('')
        setName('')
        setVideoFile({})
        setUploadVideoModal(false)
    }

    useEffect(() => {
        if (error && loadingCourseDetail === false) {
            history.push(`/course?joinCourse=true&&courseId=${courseId}`)
        }
    }, [error])

    useEffect(() => {
        if (!courseDetail?.title || courseId !== courseDetail._id) {
            dispatch(getCourseDetailAction(courseId))
        } else {
            setCurrentCourse(courseDetail)
        }
        return () => {
            setTab(0)
        }
    }, [courseId, courseDetail, loadingUpdate, loadingUploadVideo, loadingUploadVideo])

    return (
        <Layout>

            <Modal
                modalTitle={'New course'}
                show={updateCourseModal}
                handleClose={() => setUpdateCourseModal(false)}
                onHide={() => setUpdateCourseModal(false)}
                size='lg'
            >
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                    rows={5}
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
                    icon='fa fa-edit'
                    onClick={updateCourseHandler}
                    long
                >
                    Update
                </Button>
            </Modal>

            {loadingCourseDetail && <Loader />}
            <div className="content-wrapper">
                <div className="container-fluid">
                    <Row>
                        <Col>
                            <div className="row pt-2 pb-2">
                                <div className="col-sm-9">
                                    <h4 className="page-title">Course Detail</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="javaScript:void();">Categories</a></li>
                                        <li className="breadcrumb-item"><a href="javaScript:void();">{currentCourse?.category?.name}</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">{currentCourse?.title}</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="card" style={{ marginBottom: '5px' }}>
                                <div className="card-body">

                                    <blockquote className="blockquote">
                                        <h3>{currentCourse?.title}
                                            {
                                                user?._id === currentCourse?.createdBy?._id && (
                                                    <Button
                                                        icon='fa fa-edit'
                                                        status='light'
                                                        onClick={handleShowUpdateCourseModal}
                                                        small
                                                    >
                                                    </Button>
                                                )
                                            }
                                        </h3>
                                        <div className="user-details">
                                            <div className="media align-items-center">
                                                <div className="avatar">
                                                    <img className="side-user-img" src={`${AWS_FOLDER.IMAGE}${currentCourse?.createdBy?.profile?.avatar}`} alt="user avatar" style={{ marginRight: '5px' }} />
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="side-user-name">
                                                        {
                                                            currentCourse?.createdBy?.profile?.firstName + ' ' + currentCourse?.createdBy?.profile?.lastName
                                                        }
                                                    </h6>
                                                </div>

                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ color: 'black', fontSize: '16px', paddingTop: '15px' }}><strong>Duration:</strong> {formatDate(currentCourse?.fromDate) + ' - ' + formatDate(currentCourse?.toDate)}</p>
                                            <p style={{ color: 'black', fontSize: '16px' }}><strong>Category:</strong> {currentCourse?.category?.name}</p>
                                        </div>
                                        <div className="pull-right" style={{ cursor: 'pointer' }} onClick={() => setShowListUserInCourse(true)}>
                                            <p style={{ color: 'black', fontSize: '16px' }}>
                                                <strong>Total students: </strong>{currentCourse.totalUserInCourse}
                                                <span className='fa fa-user-circle'></span>
                                            </p>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <Modal
                                show={showListUserInCourse}
                                modalTitle='List students'
                                handleClose={() => setShowListUserInCourse(false)}
                                onHide={() => setShowListUserInCourse(false)}
                            >
                                {
                                    currentCourse?.listUserInCourse && currentCourse?.listUserInCourse.map((user, index) => (
                                        <li class="list-group-item">{index + 1}. {user.user.profile.firstName + ' ' + user.user.profile.lastName}</li>
                                    ))
                                }
                            </Modal>
                        </Col>
                    </Row>

                    <Row>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <ul className="nav nav-tabs nav-tabs-info nav-justified">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" onClick={() => setTab(0)} style={{ cursor: 'pointer' }}><i className="icon-home"></i> <span className="hidden-xs">Course</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" onClick={() => setTab(1)} style={{ cursor: 'pointer' }}><i className="icon-user"></i> <span className="hidden-xs">Blog</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" onClick={() => setTab(2)} style={{ cursor: 'pointer' }}><i className="icon-envelope-open"></i> <span className="hidden-xs">Activity</span></a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        {tab === 0 && (
                                            <>
                                                <div className="tab-pane active">
                                                    <hr />
                                                    <h3>Description</h3>
                                                    <p>{currentCourse?.description}</p>
                                                    <hr />
                                                    {
                                                        user?._id === currentCourse?.createdBy?._id && (
                                                            <Button
                                                                status='info'
                                                                icon='fa fa-plus'
                                                                onClick={() => setUploadVideoModal(true)}
                                                            >
                                                                Upload video
                                                            </Button>
                                                        )
                                                    }
                                                    <div class="row">
                                                        {
                                                            currentCourse?.videos?.length > 0 ? currentCourse.videos.map((video, index) => (
                                                                <div class="col-12 col-lg-4 card-zoom" style={{ textAlign: '-webkit-center' }}>
                                                                    <ReactPlayer
                                                                        url={`${AWS_FOLDER.VIDEO}${video.file}`}
                                                                        className='react-player'
                                                                        controls={true}
                                                                        width={500}
                                                                        height={300}
                                                                        style={{ border: '1px solid #14b6ff' }}

                                                                    />
                                                                    <h4>{video.name}</h4>
                                                                </div>
                                                            )) : <div>
                                                                <i>No video upload</i>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                                <Modal
                                                    modalTitle={'Upload video'}
                                                    show={uploadVideoModal}
                                                    handleClose={() => setUploadVideoModal(false)}
                                                    onHide={() => setUploadVideoModal(false)}
                                                >
                                                    {loadingUploadVideo && <Loader />}
                                                    {errorUploadVideo && <Message variant="danger">{errorUploadVideo}</Message>}
                                                    {message && <Message variant="success">{message}</Message>}
                                                    <Input
                                                        label='Name'
                                                        placeholder='Enter name...'
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        important
                                                    />
                                                    <Input
                                                        type='file'
                                                        label='Choose video'
                                                        name={videoFile}
                                                        onChange={handleUploadVideo}
                                                        lang="en"
                                                        important
                                                    />
                                                    <Button
                                                        status='info'
                                                        icon='fa fa-plus'
                                                        onClick={uploadVideoHandler}
                                                    >
                                                        Upload
                                                    </Button>
                                                </Modal>
                                            </>
                                        )}




                                        {tab === 1 && (
                                            <Blog _id={courseId} />
                                        )}






                                        {tab === 2 && (
                                            <Activity />
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>

                </div>
            </div>
        </Layout>
    )
}

export default CourseDetail
