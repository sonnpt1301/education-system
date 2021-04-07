import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListBLogAction, createBlogAction, updateBlogStatusAction } from '../../../actions'
import moment from 'moment'
import { AWS_FOLDER } from '../../../config'
import Loader from '../../../components/common/Loader'
import Button from '../../../components/Button'
import Modal from '../../../components/common/Modal'
import Input from '../../../components/common/Input'
import Message from '../../../components/common/Message'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { Figure } from 'react-bootstrap'

const PersonalBlog = ({ courseId }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { loading, blogList, loadingUpdate, errorUpdate } = useSelector(state => state.blog)
    const [blogId, setBlogId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [bgImage, setBgImage] = useState({})
    const [isAttach, setIsAttach] = useState(false)
    const [previewBgImage, setPreviewBgImage] = useState(null)
    const [files, setFiles] = useState([])
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [message, setMessage] = useState('')

    const handleUploadBackgroundImage = (e) => {
        setBgImage(e.target.files[0])
        setPreviewBgImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleUploadAttachFiles = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            files.push(file[i])
            setFiles(files)
        }
    }


    const showEditBlogModal = (id) => {
        const blog = blogList?.blogs?.find(blog => blog._id === id)
        setBlogId(blog._id)
        setTitle(blog.title)
        setContent(blog.content)
        setBgImage(`${AWS_FOLDER.IMAGE}${blog.bgImage}`)
        setFiles(blog.files)
        setShowUpdateModal(true)
        console.log(files)
    }

    const updateBlogHandler = () => {
        dispatch(updateBlogStatusAction({
            id: blogId,
            body: {
                title,
                content,
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
        setShowUpdateModal(false)
    }

    useEffect(() => {
        if (!loadingUpdate && !errorUpdate) {
            setMessage('Update blog successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingUpdate, errorUpdate]);

    useEffect(() => {
        if (courseId) {
            dispatch(getListBLogAction({
                createdBy: user._id,
                course: courseId,
            }))
        }
    }, [loadingUpdate])

    return (
        <>
            {/* Update blog modal */}
            <Modal
                modalTitle={'Update blog information'}
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                onHide={() => setShowUpdateModal(false)}
            >
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                        src={previewBgImage ? previewBgImage : bgImage}
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
                            files.map((file) => (
                                <>
                                    <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                        <FileIcon extension={file.fileName.split('.').pop()} {...defaultStyles[`${file.fileName.split('.').pop()}`]} />
                                    </div>
                                    <span style={{ paddingLeft: '10px' }}>{file.fileName}</span>
                                    <br />
                                </>
                            ))
                        }
                    </>
                }
                <Button
                    status='info'
                    onClick={updateBlogHandler}
                    icon='fa fa-edit'
                    long
                >
                    Update
                </Button>
            </Modal>


            {loading && <Loader />}

            {
                blogList?.blogs.length ? blogList.blogs.map((blog, index) => (
                    <div className="card">
                        <div className="card-body">
                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div><img src={`${AWS_FOLDER.IMAGE}${blog.createdBy.profile.avatar}`}
                                    className="img-circle user-profile" alt="user avatar" /></div>
                                <span><h5 className="mt-0 mb-1 ml-1" style={{ paddingRight: '10px' }}>{blog.createdBy.profile.firstName + " " + blog.createdBy.profile.lastName}
                                </h5></span>
                                <div className="card-action">
                                    <div className="dropdown">
                                        <a href="javascript:void();" className="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" aria-expanded="false">
                                            <i className="icon-options"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-177px, 21px, 0px)' }}>
                                            <div className="dropdown-item" onClick={() => showEditBlogModal(blog._id)}>Edit</div>
                                            <div className="dropdown-item">Delete</div>
                                        </div>
                                    </div>
                                </div>
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
                )) :
                    <div style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
                        <i>No blog</i>
                    </div>
            }
        </>
    )
}

export default PersonalBlog
