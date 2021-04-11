import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { afterSendMessage, getListMessageAction, getListUserAction, uploadFileAction } from '../../actions'
import { AWS_FOLDER, API_CONFIG } from '../../config'
import moment from 'moment'
import './style.css'
import { io } from 'socket.io-client'
import Button from '../../components/Button'
import Modal from '../../components/common/Modal'
import { Loader } from '../../components/common/Loader'
import Message from '../../components/common/Message'
import Input from '../../components/common/Input'

let socket
let messagesEnd
const Chat = () => {
    const endpoint = API_CONFIG.END_POINT

    const dispatch = useDispatch()

    const { messages, loading, data } = useSelector(state => state.chat)
    const { user } = useSelector(state => state.auth)
    const { userList } = useSelector(state => state.user)

    const [index, setIndex] = useState(0)
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [showCreateNewMessage, setShowCreateNewMessage] = useState(false)
    const [error, setError] = useState('')
    const [file, setFile] = useState()


    const handleShowBoxMessage = (index) => {
        setIndex(index)
    }

    const handleUploadFile = (e) => {
        const fileUpload = e.target.files[0]
        dispatch(uploadFileAction({
            file: fileUpload
        }))

    }

    const handleCreateNewMessage = (id) => {
        socket.emit('Send message', {
            sender: user._id,
            receiver: id
        })
        setShowCreateNewMessage(false)
    }

    const sendMessageHandler = (e) => {
        if (message === '') {
            return setError('Please write your message...!!!')
        }
        socket.emit('Send message', {
            message,
            sender: user._id,
            receiver: messages[index].sender._id === user._id ? messages[index].receiver._id : messages[index].sender._id,
        })
        setMessage('')
        setError('')
    }


    useEffect(() => {
        socket = io(endpoint)
        const room = 'Education'

        socket.on('Output message', (data) => {
            dispatch(afterSendMessage(data))
        })

        if (data?.fileName) {
            socket.on('Output message', (data) => {
                dispatch(getListMessageAction())
            })
        }

        socket.emit('room', room);


        return () => {
            socket.emit("disconnection");
            socket.off();
        };
    }, [])

    useEffect(() => {
        messagesEnd.scrollIntoView({ behavior: 'smooth' })
    })

    useEffect(() => {
        dispatch(getListUserAction({
            firstName: search,
            isDeleted: false
        }))
    }, [search])

    useEffect(() => {
        if (data?.fileName) {
            console.log(data)
            socket.emit('Send message', {
                file: data.fileName,
                sender: user._id,
                receiver: messages[index]?.sender?._id === user._id ? messages[index]?.receiver?._id : messages[index]?.sender?._id,
            })
        }
    }, [data?.fileName])

    useEffect(() => {
        dispatch(getListMessageAction())
    }, [])

    return (
        <Layout>
            {loading && <Loader />}
            <div className="content-wrapper">
                <div className="container-fluid">

                    <Modal
                        modalTitle={'New Message'}
                        show={showCreateNewMessage}
                        handleClose={() => setShowCreateNewMessage(false)}
                        onHide={() => setShowCreateNewMessage(false)}
                        size='sm'
                    >
                        <input type="text"
                            placeholder='Search...'
                            class="form-control form-control-rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {
                            userList?.data && userList.data.map((user, index) => (
                                <ul class="list-group" style={{ paddingTop: '5px' }}>

                                    <li className="d-flex justify-content-between align-items-center list-friend-css"
                                        onClick={() => handleCreateNewMessage(user._id)}
                                    >
                                        <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ margin: '5px' }} src={`${AWS_FOLDER.IMAGE}${user.profile.avatar}`}
                                                className="img-circle user-profile" alt="user avatar"
                                            />
                                            <div style={{ paddingLeft: '10px' }} className="mt-0 mb-1 ml-1">{
                                                user.profile.firstName + ' ' + user.profile.lastName
                                            }</div>
                                        </div>
                                    </li>
                                </ul>
                            ))
                        }
                    </Modal>


                    <Row>
                        <Col sm={3}>
                            <div className="card">
                                <div className="card-header text-uppercase" style={{ margin: '7px' }}>Friends <span>
                                    <Button
                                        status='light'
                                        icon='fa fa-edit'
                                        onClick={() => setShowCreateNewMessage(true)}
                                    />
                                </span></div>
                                <div className="card-body outer-message" style={{ padding: '0' }}>
                                    {
                                        messages.map((msg, index) => (
                                            <ul class="list-group" style={{ paddingTop: '5px' }}>

                                                <li className="d-flex justify-content-between align-items-center list-friend-css"
                                                    onClick={() => handleShowBoxMessage(index)}
                                                >
                                                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img style={{ margin: '5px' }} src={`${AWS_FOLDER.IMAGE}${msg.sender._id !== user._id ?
                                                            msg?.sender?.profile?.avatar :
                                                            msg?.receiver?.profile?.avatar
                                                            }`}
                                                            className="img-circle user-profile" alt="user avatar"
                                                        />
                                                        <div style={{ paddingLeft: '10px' }} className="mt-0 mb-1 ml-1">{
                                                            msg.sender._id !== user._id ?
                                                                msg?.sender?.profile?.firstName + ' ' + msg?.sender?.profile?.lastName :
                                                                msg?.receiver?.profile?.firstName + ' ' + msg?.receiver?.profile?.lastName
                                                        }</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        ))
                                    }

                                </div>
                            </div>
                        </Col>
                        <Col sm={9}>
                            <div className="card">
                                <div className="card-header text-uppercase">
                                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* <img src={''} className="img-circle user-profile" alt="user avatar" /> */}
                                        <span><div className="mt-0 mb-1 ml-1">{
                                            messages[index]?.sender?._id !== user._id ?
                                                messages[index]?.sender?.profile?.firstName + ' ' + messages[index]?.sender?.profile?.lastName :
                                                messages[index]?.receiver?.profile?.firstName + ' ' + messages[index]?.receiver?.profile?.lastName
                                        }</div></span>
                                    </div>
                                </div>

                                <div class="card-body outer-message" >
                                    {
                                        messages[index]?.messages.map(msg => (
                                            <div>
                                                {
                                                    msg.sender._id !== user._id ? (
                                                        <>
                                                            <div className="user-profile" style={{ display: 'flex', marginTop: '10px' }}>
                                                                <img src={`${AWS_FOLDER.IMAGE}${msg?.sender?.profile?.avatar}`}
                                                                    className="img-circle user-profile" alt="user avatar"
                                                                />
                                                                {
                                                                    msg.file ?
                                                                        <img src={`${AWS_FOLDER.IMAGE}${msg?.file}`} alt="image_upload"
                                                                            style={{ width: '350px', height: '350px', borderRadius: 'inherit', boxShadow: 'none' }} /> :
                                                                        <div className="card ml-1" style={{ borderRadius: '15px', marginBottom: '0', marginRight: '5px' }}>
                                                                            <div className="card-body" style={{ padding: '5px 20px' }}>
                                                                                <div className="list-unstyled">
                                                                                    <div className="media">
                                                                                        <div className="media-body" style={{ wordBreak: 'break-all' }}>
                                                                                            {msg.messages}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                            <div style={{ wordBreak: 'break-all' }}><small style={{ marginLeft: '60px', color: 'rgb(172 170 170)' }}>{moment(msg.createdAt).fromNow()}</small></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="user-profile" style={{ display: 'flex', marginTop: '10px', justifyContent: 'flex-end' }}>
                                                                {
                                                                    msg.file ?
                                                                        <img src={`${AWS_FOLDER.IMAGE}${msg?.file}`} alt="image_upload"
                                                                            style={{ width: '350px', height: '350px', borderRadius: 'inherit', boxShadow: 'none' }} /> :
                                                                        <div className="card ml-1" style={{ borderRadius: '15px', backgroundColor: 'rgb(0, 132, 255)', marginBottom: '0', marginRight: '5px' }}>
                                                                            <div className="card-body" style={{ padding: '5px 20px' }}>
                                                                                <div className="list-unstyled">
                                                                                    <div className="media">
                                                                                        <div className="media-body" style={{ wordBreak: 'break-all', color: 'white' }}>
                                                                                            {msg.messages}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                }
                                                                <img src={`${AWS_FOLDER.IMAGE}${msg?.sender?.profile?.avatar}`}
                                                                    className="img-circle user-profile" alt="user avatar"
                                                                />
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><small style={{ marginRight: '40px', color: 'rgb(172 170 170)' }}>{moment(msg.createdAt).fromNow()}</small></div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }

                                    <div
                                        ref={el => {
                                            messagesEnd = el;
                                        }}
                                        style={{ float: 'left', clear: 'both' }}
                                    />
                                </div>
                                {error && <Message variant='danger'>{error}</Message>}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        id='upload-file'
                                        type='file'
                                        name={file}
                                        onChange={handleUploadFile}
                                        accept='image/*'
                                        lang="en"
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        status='info'
                                        icon='fa fa-paperclip'
                                        onClick={() => document.getElementById('upload-file').click()}
                                    >

                                    </Button>
                                    <input type="text"
                                        class="form-control form-control-rounded"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={event => event.key === 'Enter' && sendMessageHandler()} />
                                    {
                                        message && (
                                            <Button
                                                status='info'
                                                icon='fa fa-send'
                                            >

                                            </Button>
                                        )
                                    }
                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        </Layout >
    )
}

export default Chat
