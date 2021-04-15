import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createActivityAction, downloadFileAction, getDetailActivityAction, getListActivityAction, uploadFileAction } from '../../actions/activity.action'
import { AWS_FOLDER, API_CONFIG } from '../../config'
import Button from '../../components/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Message from '../../components/common/Message'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { Loader } from '../../components/common/Loader'
import { formatDate } from '../../utils'
import moment from 'moment'
import Badge from '../../components/Badge'
import { Col, Row } from 'react-bootstrap'

const Activity = ({ _id }) => {

    const dispatch = useDispatch()
    const {
        activityList,
        loading,
        loadingCreate,
        errorCreate,
        activityDetail,
        loadingDetail,
        errorDetail,
        loadingUpload,
        errorUpload
    } = useSelector(state => state.activity)
    const { user } = useSelector(state => state.auth)
    const [activityId, setActivityId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const [files, setFiles] = useState([])
    const [filesUploaded, setFilesUploaded] = useState([])

    const [reqFiles, setReqFiles] = useState([])
    const [reqFilesUploaded, setReqFilesUploaded] = useState([])

    const [isFIle, setIsFIle] = useState(false)
    const [isReqFile, setIsReqFile] = useState(false)
    const [createdBy, setCreatedBy] = useState({})
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')
    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false)
    const [showDetailActivityModal, setShowDetailActivityModal] = useState(false)

    const handleUploadAttachFiles = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            files.push(file[i])
            setFiles(files)
        }
        setIsFIle(true)
    }

    const handleUploadReqFiles = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            reqFiles.push(file[i])
            setReqFiles(reqFiles)
        }
        setIsReqFile(true)
    }

    const createActivityHandler = () => {
        dispatch(createActivityAction({
            courseId: _id,
            body: {
                name,
                description,
                fromDate,
                toDate,
            }
        }))
    }

    const handleDownloadFile = (fileId, fileName) => {
        dispatch(downloadFileAction({ fileId, fileName, activityId }))
        console.log(activityId)
    };

    const handleShowDetailActivity = (id) => {
        dispatch(getDetailActivityAction({
            id
        }))

        setShowDetailActivityModal(true)
    }

    const handleCloseDetailActivityModal = () => {
        resetField()
    }

    const uploadFileHandler = () => {
        if (files.length > 0) {
            console.log('files')
            dispatch(uploadFileAction({
                id: activityId,
                files: files
            }))
        }
        if (reqFiles.length > 0) {
            console.log('req files')
            dispatch(uploadFileAction({
                id: activityId,
                files: reqFiles
            }))
        }
    }

    const resetField = () => {
        setName('')
        setDescription('')
        setFromDate('')
        setToDate('')
        setCreatedBy({})
        setStatus('')
        setFiles([])
        setReqFiles([])
        setIsFIle(false)
        setMessage('')
        setIsReqFile(false)
        setShowCreateActivityModal(false)
        setShowDetailActivityModal(false)
    }

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setMessage('Create activity successfully')
            setTimeout(() => {
                resetField()
            }, 1500)
        }
    }, [loadingCreate, errorCreate])

    useEffect(() => {
        if (activityDetail) {
            setActivityId(activityDetail?._id)
            setName(activityDetail?.name)
            setDescription(activityDetail?.description)
            setFromDate(activityDetail?.fromDate)
            setToDate(activityDetail?.toDate)
            setCreatedBy(activityDetail?.createdBy)
            setStatus(activityDetail?.status)

            const reqFiles = activityDetail?.files?.filter((file) => file.createdBy._id === activityDetail.createdBy._id)
            setReqFilesUploaded(reqFiles)

            const files = activityDetail?.files?.filter((file) => file.createdBy._id === user._id)
            setFilesUploaded(files)
        }
    }, [activityDetail])

    useEffect(() => {
        dispatch(getListActivityAction({
            id: _id
        }))
    }, [loadingCreate])

    return (
        <>
            <Modal
                modalTitle='New activity'
                show={showCreateActivityModal}
                handleClose={() => setShowCreateActivityModal(false)}
                onHide={() => setShowCreateActivityModal(false)}
            >
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {message && <Message variant="success">{message}</Message>}
                <Input
                    label='Name'
                    placeholder='Enter activity name here...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label='Description'
                    placeholder='Enter description here...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                <Button
                    status='info'
                    icon='fa fa-plus'
                    long
                    onClick={createActivityHandler}
                >
                    Create
                </Button>
            </Modal>

            <Modal
                modalTitle='Activity Detail'
                show={showDetailActivityModal}
                handleClose={handleCloseDetailActivityModal}
                onHide={handleCloseDetailActivityModal}
                size='xl'
            >
                {loadingDetail && <Loader />}
                <div class="card">
                    <div class="card-header text-uppercase">{name}
                        <small class="text-black" style={{ float: 'right' }}>
                            {
                                status === 'onProcess' && (<Badge status='success'>On process</Badge>)
                            }
                            {
                                status === 'outDate' && (<Badge status='danger'>Out date</Badge>)
                            }
                        </small>
                    </div>
                    <div class="card-body">
                        <form>

                            <div class="form-group row">
                                <label for="Xlarge-input" class="col-sm-3 col-form-label">Created by</label>
                                <div class="col-sm-9">
                                    <div className="user-details">
                                        <div className="media align-items-center">

                                            <div className="avatar">
                                                <img className="side-user-img" src={`${AWS_FOLDER.IMAGE}${createdBy?.profile?.avatar}`} alt="user avatar" style={{ marginRight: '5px' }} />
                                            </div>
                                            <div className="media-body">
                                                <h6 className="side-user-name" >
                                                    {
                                                        createdBy?.profile?.firstName + ' ' + createdBy?.profile?.lastName
                                                    }
                                                </h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="Xlarge-input" class="col-sm-3 col-form-label">Description</label>
                                <div class="col-sm-9">
                                    <p>{description}</p>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="default-input" class="col-sm-3 col-form-label">Deadline</label>
                                <div class="col-sm-9">
                                    <p>{formatDate(fromDate) + ' - ' + formatDate(toDate)}</p>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="default-input" class="col-sm-3 col-form-label">Requirements</label>
                                <div class="col-sm-9">
                                    {
                                        reqFilesUploaded?.length > 0 && reqFilesUploaded?.map((file) => (
                                            <div className="card" style={{ cursor: 'pointer' }} onClick={() => handleDownloadFile(file._id, file.fileName)}>
                                                <div className="card-body">
                                                    <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                        <FileIcon extension={file?.fileName?.split('.').pop()} {...defaultStyles[`${file?.fileName?.split('.').pop()}`]} />
                                                    </div>
                                                    <span style={{ paddingLeft: '10px' }}>{file?.fileName} </span>
                                                    <span className='fa fa-download'></span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        user.profile.role === 'tutors' && (
                                            <Input
                                                type='file'
                                                label='Attach File'
                                                name={reqFiles}
                                                onChange={handleUploadReqFiles}
                                                lang="en"
                                                multiple
                                            />
                                        )
                                    }
                                    {
                                        user?._id === createdBy?._id && (
                                            <>

                                                {
                                                    isReqFile && reqFiles.map((file) => (
                                                        <div>
                                                            <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                                <FileIcon extension={file?.name?.split('.').pop()} {...defaultStyles[`${file?.name?.split('.').pop()}`]} />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>{file?.name}</span>
                                                            <br />
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    isReqFile && (
                                                        <div style={{ textAlign: 'center' }}>
                                                            <Button
                                                                status='info'
                                                                icon='fa fa-upload'
                                                                onClick={uploadFileHandler}
                                                            >
                                                                Upload
                                                                </Button>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="small-input" class="col-sm-3 col-form-label">File submissions</label>
                                <div class="col-sm-9">
                                    {
                                        (filesUploaded?.length > 0 && user.profile.role === 'student') && filesUploaded?.map((file) => (
                                            <div className="card" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                                <div className="card-body">
                                                    <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                        <FileIcon extension={file?.fileName?.split('.').pop()} {...defaultStyles[`${file?.fileName?.split('.').pop()}`]} />
                                                    </div>
                                                    <span style={{ paddingLeft: '10px' }}>{file?.fileName} </span>
                                                    <span className='fa fa-download'></span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        user?.profile?.role === 'student' && (
                                            <Input
                                                type='file'
                                                label='Attach File'
                                                name={files}
                                                onChange={handleUploadAttachFiles}
                                                lang="en"
                                                multiple
                                            />
                                        )
                                    }
                                    {
                                        isFIle && files.map((file) => (
                                            <div>
                                                <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                    <FileIcon extension={file?.name?.split('.').pop()} {...defaultStyles[`${file?.name?.split('.').pop()}`]} />
                                                </div>
                                                <span style={{ paddingLeft: '10px' }}>{file?.name}</span>
                                                <br />
                                            </div>
                                        ))
                                    }
                                    {
                                        isFIle && (
                                            <div style={{ textAlign: 'center' }}>
                                                <Button
                                                    status='info'
                                                    icon='fa fa-upload'
                                                    onClick={uploadFileHandler}
                                                >
                                                    Upload
                                                </Button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {loading && <Loader />}
            <div class="row">
                <div class="col-lg-12">
                    {
                        user?.profile?.role === 'tutors' && (
                            <Button
                                status='info'
                                icon="fa fa-plus"
                                onClick={() => setShowCreateActivityModal(true)}
                            >
                                New activity
                            </Button>
                        )
                    }
                    <div class="card-header text-uppercase">Activities</div>
                    <div class="card-body">
                        {
                            activityList?.length > 0 ? activityList.map((activity, index) => (
                                <div class="card" key={index} style={{ cursor: 'pointer' }} onClick={() => handleShowDetailActivity(activity._id)}>
                                    <div class="list-group">
                                        <div class="list-group-item list-group-item-action flex-column align-items-start">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1 text-black">{activity.name}</h5>
                                                <small class="text-black text-uppercase">
                                                    {
                                                        activity.status === 'onProcess' && (<Badge status='success'>On process</Badge>)
                                                    }
                                                    {
                                                        activity.status === 'outDate' && (<Badge status='danger'>Out date</Badge>)
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <i>No activity</i>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Activity
