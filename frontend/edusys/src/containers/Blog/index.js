import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListBLogAction, createBlogAction } from '../../actions/blog.action'
import moment from 'moment'
import { AWS_FOLDER } from '../../config'
import Loader from '../../components/common/Loader'
import Button from '../../components/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Message from '../../components/common/Message'
import { Figure } from 'react-bootstrap'


const Blog = ({ _id }) => {

    const dispatch = useDispatch()
    const {
        blogList,
        loading,
        loadingCreate,
        errorCreate
    } = useSelector(state => state.blog)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [bgImage, setBgImage] = useState({})
    const [previewBgImage, setPreviewBgImage] = useState(null)
    const [files, setFiles] = useState([])
    const [isAttach, setIsAttach] = useState(false)
    const [message, setMessage] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const handleCloseCreateModal = () => setShowCreateModal(false)

    const handleUploadBackgroundImage = (e) => {
        setBgImage(e.target.files[0])
        setPreviewBgImage(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setMessage('Create blog successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingCreate, errorCreate,]);


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
        setBgImage([])
        setPreviewBgImage(null)
        setMessage('')
        setShowCreateModal(false)
    }

    useEffect(() => {
        dispatch(getListBLogAction({
            _id: _id
        }))
    }, [_id, loadingCreate])



    return (
        <>
            <Modal
                modalTitle={'New blog'}
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                onHide={handleCloseCreateModal}
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
                        <Input
                            type='file'
                            label='Attach File'
                            name={files}
                            onChange={(e) => setFiles(e.target.files[0])}
                            lang="en"
                        />
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


            {loading && <Loader />}
            <Button
                icon='fa fa-plus-circle'
                status='info'
                onClick={() => setShowCreateModal(true)}
            >
                New blog
            </Button>
            {
                blogList?.blogs && blogList.blogs.map((blog, index) => (
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
                                        <hr />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Blog
