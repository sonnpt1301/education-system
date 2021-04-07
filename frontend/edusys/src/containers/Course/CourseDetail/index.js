import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetailAction } from '../../../actions'
import Layout from '../../../components/Layout'
import { AWS_FOLDER } from '../../../config'
import { Loader } from '../../../components/common/Loader'
import Blog from '../../Blog'
import Activity from '../../Activity'

const CourseDetail = ({ match }) => {

    const dispatch = useDispatch()
    const { courseDetail, loadingCourseDetail } = useSelector(state => state.course)
    const [currentCourse, setCurrentCourse] = useState({})
    const [tab, setTab] = useState(0)



    useEffect(() => {
        if (!courseDetail?.title || match.params.id !== courseDetail._id) {
            dispatch(getCourseDetailAction(match.params.id))
        } else {
            setCurrentCourse(courseDetail)
        }
        return () => {
            setTab(0)
        }
    }, [match, courseDetail])

    return (
        <Layout>
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
                                        <h3>{currentCourse?.title}</h3>
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
                                    </blockquote>
                                </div>
                            </div>
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
                                            <div className="tab-pane active">
                                                <hr />
                                                <h3>Description</h3>
                                                <p>{currentCourse?.description}</p>
                                                <hr />
                                            </div>
                                        )}




                                        {tab === 1 && (
                                            <Blog _id={match.params.id} />
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
