import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListBLogAction, createBlogAction } from '../../../actions'
import moment from 'moment'
import { AWS_FOLDER } from '../../../config'
import Loader from '../../../components/common/Loader'
import Button from '../../../components/Button'
import Modal from '../../../components/common/Modal'
import Input from '../../../components/common/Input'
import Message from '../../../components/common/Message'
import { FileIcon, defaultStyles } from 'react-file-icon'

const PersonalBlog = ({ courseId }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { loading, blogList } = useSelector(state => state.blog)


    useEffect(() => {
        if (courseId) {
            dispatch(getListBLogAction({
                createdBy: user._id,
                course: courseId,
            }))
        }
    }, [])

    return (
        <>
            {loading && <Loader />}

            {
                blogList?.blogs.length ? blogList.blogs.map((blog, index) => (
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
                )) :
                    <div style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
                        <i>No blog</i>
                    </div>
            }
        </>
    )
}

export default PersonalBlog
