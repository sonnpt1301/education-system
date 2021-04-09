import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListBLogAction, createBlogAction } from '../../actions/blog.action'
import moment from 'moment'
import { AWS_FOLDER } from '../../config'
import Button from '../../components/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Message from '../../components/common/Message'
import { Figure } from 'react-bootstrap'
import { FileIcon, defaultStyles } from 'react-file-icon'
import PersonalBlog from './PersonalBlog'
import WaitingBlog from './WaitingBlog'
import { Loader } from '../../components/common/Loader'


const Blog = ({ _id }) => {

    const dispatch = useDispatch()
    const {
        blogList,
        loading,
        loadingCreate,
        errorCreate
    } = useSelector(state => state.blog)
    const { user } = useSelector(state => state.auth)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [bgImage, setBgImage] = useState({})
    const [previewBgImage, setPreviewBgImage] = useState(null)
    const [files, setFiles] = useState([])
    const [isAttach, setIsAttach] = useState(false)
    const [message, setMessage] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [tab, setTab] = useState(0)
    const [filter, setFilter] = useState('approve')
    const [showWaitingBlogModal, setShowWaitingBlogModal] = useState(false)


    const handleUploadBackgroundImage = (e) => {
        setBgImage(e.target.files[0])
        setPreviewBgImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleCloseCreateModal = () => {
        setShowCreateModal(false)
        setMessage('')
    }

    const handleUploadAttachFiles = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            files.push(file[i])
            setFiles(files)
        }
    }

    const handleShowWaitingBlogModal = () => {
        setFilter('pending')
        setShowWaitingBlogModal(true)
    }

    const handleCloseWaitingBlogModal = () => {
        setFilter('approve')
        setShowWaitingBlogModal(false)
    }

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setMessage('Create blog successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingCreate, errorCreate]);


    const createBlogHandler = () => {
        dispatch(createBlogAction({
            body: {
                title,
                content,
                course: _id
            },
            bgImage,
            files,
        }))
    }

    const resetField = () => {
        setTitle('')
        setContent('')
        setFiles([])
        setBgImage({})
        setPreviewBgImage(null)
        setMessage('')
        setShowCreateModal(false)
    }

    useEffect(() => {
        if (tab === 0) {
            dispatch(getListBLogAction({
                course: _id,
                status: filter
            }))
        }
    }, [_id, loadingCreate, tab, filter, showWaitingBlogModal])


    return (
        <>
            <div>
                <div>
                    <ul className="nav nav-tabs nav-tabs-info nav-justified">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" onClick={() => setTab(0)} style={{ cursor: 'pointer' }}><i className="icon-home"></i> <span className="hidden-xs">Public blog</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" onClick={() => setTab(1)} style={{ cursor: 'pointer' }}><i className="icon-user"></i> <span className="hidden-xs">Personal blog</span></a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {tab === 0 && (
                            <>
                                {/* Create blog modal */}
                                <Modal
                                    modalTitle={'New blog'}
                                    show={showCreateModal}
                                    handleClose={handleCloseCreateModal}
                                    onHide={handleCloseCreateModal}
                                    size='lg'
                                >
                                    {loadingCreate && <Loader />}
                                    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                                    {message && <Message variant="success">{message}</Message>}
                                    <Input
                                        label='Title'
                                        placeholder='Enter title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        important
                                    />
                                    <Input
                                        type='textarea'
                                        label='Content'
                                        placeholder='Enter title'
                                        rows='5'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        important
                                    />
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
                                            src={previewBgImage ? previewBgImage : 'https://edusys-project.s3-ap-southeast-1.amazonaws.com/image/blog.jpg'}
                                        />
                                        <Figure.Caption style={{ textAlign: 'center' }}>
                                            {previewBgImage ? 'New background image' : 'Default background image'}
                                        </Figure.Caption>
                                    </Figure>
                                    <Button
                                        icon='fa fa-paperclip'
                                        long
                                        onClick={(e) => setIsAttach(!isAttach)}
                                    >
                                        Attach files
                                    </Button>
                                    {
                                        isAttach && (
                                            <>
                                                <Input
                                                    type='file'
                                                    label='Attach File'
                                                    name={files}
                                                    onChange={handleUploadAttachFiles}
                                                    lang="en"
                                                    multiple
                                                />
                                                {
                                                    files && files.map((file) => (
                                                        <>
                                                            <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                                <FileIcon extension={file.name.split('.').pop()} {...defaultStyles[`${file.name.split('.').pop()}`]} />
                                                            </div>
                                                            <span style={{ paddingLeft: '10px' }}>{file.name}</span>
                                                            <br />
                                                        </>
                                                    ))
                                                }

                                            </>
                                        )
                                    }
                                    <Button
                                        status='info'
                                        onClick={createBlogHandler}
                                        icon='fa fa-plus-circle'
                                        long
                                    >
                                        Create
                                    </Button>
                                </Modal>

                                {/* Waiting blogs modal */}
                                {
                                    showWaitingBlogModal &&
                                    <WaitingBlog
                                        showWaitingBlogModal
                                        handleCloseWaitingBlogModal={handleCloseWaitingBlogModal}
                                        status={'pending'}
                                        courseId={_id}
                                    />
                                }


                                {loading && <Loader />}
                                <div className="row">
                                    <div className="col-7">
                                        <Button
                                            icon='fa fa-plus-circle'
                                            status='info'
                                            onClick={() => setShowCreateModal(true)}
                                        >
                                            New blog
                                        </Button>

                                    </div>
                                    {
                                        user.profile.role === 'tutors' && (
                                            <div className="col-5">
                                                <Button
                                                    icon='fa fa-clock-o'
                                                    status='light'
                                                    onClick={handleShowWaitingBlogModal}
                                                    right
                                                    long
                                                >
                                                    Waiting for approving
                                        </Button>
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    (blogList?.blogs?.length && !showWaitingBlogModal) ? blogList.blogs.map((blog, index) => (
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                    <div><img src={`${AWS_FOLDER.IMAGE}${blog.createdBy.profile.avatar}`}
                                                        className="img-circle user-profile" alt="user avatar" /></div>
                                                    <span><h5 className="mt-0 mb-1 ml-1">{blog.createdBy.profile.firstName + " " + blog.createdBy.profile.lastName}</h5></span>
                                                </div>
                                                <img className="rounded" style={{ height: '100%', width: '100%' }} src={`${AWS_FOLDER.IMAGE}${blog.bgImage}`} alt="user avatar" />
                                                <ul className="list-unstyled" key={index}>
                                                    <li className="media">
                                                        <div className="media-body">
                                                            <h5 className="mt-0 mb-0">{blog.title}</h5>
                                                            <div style={{ paddingBottom: '25px' }}><small style={{ color: 'rgb(172 170 170)' }}>{moment(blog.createdAt).fromNow()}</small></div>
                                                            <p>{blog.content}</p>
                                                            {
                                                                blog?.files?.map((file) => (
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                                                <FileIcon extension={file.fileName.split('.').pop()} {...defaultStyles[`${file.fileName.split('.').pop()}`]} />
                                                                            </div>
                                                                            <span style={{ paddingLeft: '10px' }}>{file.fileName}</span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )).reverse() :
                                        <div style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
                                            <i>No blog</i>
                                        </div>
                                }
                            </>
                        )}




                        {tab === 1 && (
                            <PersonalBlog courseId={_id} />
                        )}



                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
