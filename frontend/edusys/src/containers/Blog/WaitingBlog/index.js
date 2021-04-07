import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListBLogAction, createBlogAction, updateBlogStatusAction } from '../../../actions/blog.action'
import moment from 'moment'
import { AWS_FOLDER } from '../../../config'
import { Loader } from '../../../components/common/Loader'
import Button from '../../../components/Button'
import Modal from '../../../components/common/Modal'
import Input from '../../../components/common/Input'
import Message from '../../../components/common/Message'
import { Figure } from 'react-bootstrap'
import { FileIcon, defaultStyles } from 'react-file-icon'

const WaitingBlog = ({ showWaitingBlogModal, handleCloseWaitingBlogModal, status, courseId }) => {

    const dispatch = useDispatch()
    const { blogList, loading, loadingUpdate, errorUpdate } = useSelector(state => state.blog)

    const [message, setMessage] = useState('')

    const resetField = () => {
        setMessage('')
    }

    useEffect(() => {
        if (!loadingUpdate && !errorUpdate) {
            setMessage('Approve successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingUpdate, errorUpdate]);

    const rejectBlogHandler = (id) => {
        dispatch(updateBlogStatusAction({
            id: id,
            body: { status: 'reject' }
        }))
    }
    const approveBlogHandler = (id) => {
        dispatch(updateBlogStatusAction({
            id: id,
            body: { status: 'approve' }
        }))
    }


    useEffect(() => {
        dispatch(getListBLogAction({
            course: courseId,
            status: status
        }))
    }, [loadingUpdate])

    return (
        <Modal
            modalTitle={`Waiting for approving (${blogList.total}) `}
            show={showWaitingBlogModal}
            handleClose={handleCloseWaitingBlogModal}
            onHide={handleCloseWaitingBlogModal}
            size='lg'
        >
            {loading && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {message && <Message variant="success">{message}</Message>}
            {
                (blogList?.blogs?.length) ? blogList.blogs.map((blog, index) => (
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="user-profile col-7" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <div><img src={`${AWS_FOLDER.IMAGE}${blog.createdBy.profile.avatar}`}
                                        className="img-circle user-profile" alt="user avatar" /></div>
                                    <span><h5 className="mt-0 mb-1 ml-1">{blog.createdBy.profile.firstName + " " + blog.createdBy.profile.lastName}</h5>
                                    </span>
                                </div>
                                <div className='col-5'>
                                    <div style={{ float: 'right' }}>
                                        <Button
                                            status='danger'
                                            icon='fa fa-window-close'
                                            small
                                            onClick={() => rejectBlogHandler(blog._id)}
                                        >
                                        </Button>
                                        <Button
                                            status='success'
                                            icon='fa fa-check-circle'
                                            small
                                            onClick={() => approveBlogHandler(blog._id)}
                                        >
                                        </Button>
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
        </Modal>
    )
}

export default WaitingBlog
