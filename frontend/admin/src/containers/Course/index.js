import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { getListCourseAction, updateCourseAction } from '../../actions'
import Badge from '../../components/Badge'
import Input from '../../components/common/Input'
import Loader from '../../components/common/Loader'
import Message from '../../components/common/Message'
import Modal from '../../components/common/Modal'
import Layout from '../../components/Layout'
import { formatDate } from '../../utils'

const Course = () => {
    const dispatch = useDispatch()

    const {
        courseList,
        loading,
        loadingUpdate,
        errorUpdate,
    } = useSelector(state => state.course)

    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState('')

    const approveCourseHandler = (id) => {
        const course = courseList.data.find(c => c._id === id)
        console.log(id)
        dispatch(updateCourseAction({
            id: course._id,
            body: { status: 'on process' }
        }))
    }

    const rejectCourseHandler = (id) => {
        const course = courseList.data.find(c => c._id === id)
        console.log(id)
        dispatch(updateCourseAction({
            id: course._id,
            body: { status: 'reject' }
        }))
    }


    useEffect(() => {
        dispatch(getListCourseAction({
            status: filter,
            limit,
            skip,
            isDeleted: false,
        }))
    }, [filter, limit, skip, loadingUpdate])


    return (
        <Layout>
            {loading && <Loader />}
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row pt-2 pb-2">
                        <div class="col-sm-9">
                            <h4 class="page-title">List courses</h4>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header"><i class="fa fa-book"></i> Total Courses: {courseList.total}
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        Show 
                                        <label>
                                            <select name="default-datatable_length" aria-controls="default-datatable" class="form-control form-control-sm"
                                                value={filter} onChange={(e) => setFilter(e.target.value)}
                                            >
                                                <option key="" value={''}>All</option>
                                                <option key="on process" value={'on process'}>On process</option>
                                                <option key="reject" value={'reject'}>Rejected</option>
                                            </select>
                                        </label>
                                            courses 
                                        <table id="default-datatable" class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Tutors</th>
                                                    <th>Duration</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    courseList?.data && courseList.data.map((course, index) => (
                                                        <tr key={course._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.title}</td>
                                                            <td>{course.description}</td>
                                                            <td>{course.category.name}</td>
                                                            <td>{course.createdBy.profile.firstName + ' ' + course.createdBy.profile.lastName}</td>
                                                            <td>{formatDate(course.fromDate) + ' - ' + formatDate(course.toDate)}</td>
                                                            <td>
                                                                {course.status === 'pending' && <Badge status='light'>Pending</Badge>}
                                                                {course.status === 'on process' && <Badge status='success'>On process</Badge>}
                                                                {course.status === 'reject' && <Badge status='danger'>Rejected</Badge>}
                                                                <span>{loadingUpdate && <Loader />}</span>
                                                            </td>

                                                            <td>
                                                                {
                                                                    course.status === 'reject' && (
                                                                        <button className="btn btn-success btn-sm waves-effect waves-success m-1"
                                                                            onClick={(e) => approveCourseHandler(course._id)}>
                                                                            <i className="fa fa-check-circle"></i>
                                                                        </button>
                                                                    )
                                                                }
                                                                {
                                                                    course.status === 'on process' && (
                                                                        <button className="btn btn-danger btn-sm waves-effect waves-danger m-1"
                                                                            onClick={(e) => rejectCourseHandler(course._id)}>
                                                                            <i className="fa fa-window-close"></i>
                                                                        </button>
                                                                    )
                                                                }
                                                                {
                                                                    course.status === 'pending' && (
                                                                        <>
                                                                            <button className="btn btn-success btn-sm waves-effect waves-success m-1"
                                                                                onClick={(e) => approveCourseHandler(course._id)}>
                                                                                <i className="fa fa-check-circle"></i>
                                                                            </button>
                                                                            <button className="btn btn-danger btn-sm waves-effect waves-danger m-1"
                                                                                onClick={(e) => rejectCourseHandler(course._id)}>
                                                                                <i className="fa fa-window-close"></i>
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }


                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Course
