import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFileAction, getBlogDetailAction } from '../../../actions'
import Modal from '../../../components/common/Modal'
import { AWS_FOLDER, API_CONFIG } from '../../../config'
import { Loader } from '../../../components/common/Loader'
import Message from '../../../components/common/Message'
import { FileIcon, defaultStyles } from 'react-file-icon'
import moment from 'moment'
import { io } from 'socket.io-client'
import './style.css'
import Button from '../../../components/Button'

let socket
let commentEnd

const BlogDetail = ({ showBlogDetailModal, handleCloseBlogDetailModal, blogId }) => {
    const endpoint = API_CONFIG.END_POINT

    const dispatch = useDispatch()
    const { blogDetail, loadingBlogDetail, errorBlogDetail } = useSelector(state => state.blog)
    const { user } = useSelector(state => state.auth)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [isAttach, setIsAttach] = useState(false)
    const handleDownloadFile = (fileId, fileName, blogId) => {
        dispatch(downloadFileAction({ fileId, fileName, blogId }))
    };

    const addCommentHandler = () => {
        if (comment === '') {
            return setMessage('Please write your comment!')
        }
        socket.emit('add comment', {
            comment,
            blogId,
            userId: user._id
        })
        setComment('')
        setMessage('')
    }

    useEffect(() => {
        socket = io(endpoint)
        const room = 'Education'

        socket.emit('room', room);

        socket.on('Output comment', (data) => {
            dispatch(getBlogDetailAction({
                blogId: blogId
            }))
        })

        return () => {
            socket.emit("disconnection");
            socket.off();
        };
    }, [])

    useEffect(() => {
        dispatch(getBlogDetailAction({
            blogId: blogId
        }))
    }, [])

    useEffect(() => {
        commentEnd.scrollIntoView({ behavior: 'smooth' })
    })


    return (
        <Modal
            modalTitle={'Blog detail'}
            show={showBlogDetailModal}
            handleClose={handleCloseBlogDetailModal}
            onHide={handleCloseBlogDetailModal}
            size='xl'
        >
            {loadingBlogDetail && <Loader />}
            <Row>
                <Col lg={7}>
                    <div className="card">
                        <div className="card-body">
                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div><img src={`${AWS_FOLDER.IMAGE}${blogDetail?.createdBy?.profile?.avatar}`}
                                    className="img-circle user-profile" alt="user avatar" /></div>
                                <span><h5 className="mt-0 mb-1 ml-1">{(blogDetail?.createdBy?.profile?.firstName || '') + " " + (blogDetail?.createdBy?.profile?.lastName || '')}</h5></span>
                            </div>
                            <img className="rounded" style={{ height: '100%', width: '100%' }} src={`${AWS_FOLDER.IMAGE}${blogDetail.bgImage}`} alt="user avatar" />
                            <ul className="list-unstyled">
                                <li className="media">
                                    <div className="media-body">
                                        <h5 className="mt-0 mb-0">{blogDetail.title}</h5>
                                        <div style={{ paddingBottom: '25px' }}><small style={{ color: 'rgb(172 170 170)' }}>{moment(blogDetail.createdAt).fromNow()}</small></div>
                                        <p>{blogDetail.content}</p>
                                        {
                                            blogDetail?.files?.length > 0 && (
                                                <Button
                                                    icon='fa fa-paperclip'
                                                    long
                                                    onClick={(e) => setIsAttach(!isAttach)}
                                                >
                                                    Attach files
                                                </Button>
                                            )
                                        }
                                        {
                                            isAttach && blogDetail?.files?.map((file) => (
                                                <div className="card" style={{ cursor: 'pointer' }} onClick={() => handleDownloadFile(file._id, file.fileName, blogDetail._id)}>
                                                    <div className="card-body">
                                                        <div style={{ width: '40px', height: '40px', display: 'inline-block', marginBottom: '15px' }}>
                                                            <FileIcon extension={file.fileName.split('.').pop()} {...defaultStyles[`${file.fileName.split('.').pop()}`]} />
                                                        </div>
                                                        <span style={{ paddingLeft: '10px' }}>{file.fileName} </span>
                                                        <span className='fa fa-download'></span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col lg={5}>
                    <div className="outer-comment">
                        {
                            blogDetail?.comments && blogDetail?.comments.map(cmt => (
                                <div>
                                    <div className="user-profile" style={{ display: 'flex', marginTop: '10px' }}>
                                        <img src={`${AWS_FOLDER.IMAGE}${cmt.user.profile.avatar}`}
                                            className="img-circle user-profile" alt="user avatar" />
                                        <div className="card ml-1" style={{ borderRadius: '15px', marginBottom: '0' }}>
                                            <div className="card-body" style={{ padding: '5px 10px' }}>
                                                <div className="list-unstyled">
                                                    <div className="media">
                                                        <div className="media-body">
                                                            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{cmt.user.profile.firstName + ' ' + cmt.user.profile.lastName}</div>
                                                            <div style={{ wordBreak: 'break-all' }} >
                                                                {cmt.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div><small style={{ marginLeft: '50px', color: 'rgb(172 170 170)' }}>{moment(cmt.createdAt).fromNow()}</small></div>
                                </div>
                            ))
                        }
                        <div
                            ref={el => {
                                commentEnd = el;
                            }}
                            style={{ float: 'left', clear: 'both' }}
                        />
                    </div>
                    {message && <Message variant='danger'>{message}</Message>}
                    <input type="text" className="form-control form-control-rounded mt-3"
                        placeholder="Write comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyUp={event => event.key === 'Enter' && addCommentHandler()}
                    />
                </Col>
            </Row>
        </Modal>
    )
}

export default BlogDetail
