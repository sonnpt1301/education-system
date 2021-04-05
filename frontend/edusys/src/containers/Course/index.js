import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListCategoryAction, getListCourseAction } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/common/Input'
import Card from '../../components/Card'
import Loader from '../../components/common/Loader'
import { AWS_FOLDER } from '../../config'
import ReactPaginate from 'react-paginate'
import Badge from '../../components/Badge'

const Course = () => {
    const dispatch = useDispatch()
    const { courseList, loading } = useSelector(state => state.course)
    const { categoryList } = useSelector(state => state.category)

    const [categoryId, setCategoryId] = useState('')

    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState(['on process', 'accomplish'])

    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };
    useEffect(() => {
        courseList && setTotal(courseList?.total || 0);
    }, [courseList]);

    useEffect(() => {
        dispatch(getListCategoryAction())
    }, [])

    useEffect(() => {
        dispatch(getListCourseAction({
            status: filter,
            limit,
            category: categoryId
        }))
    }, [categoryId, filter])

    return (
        <Layout>
            {loading && <Loader />}
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-2">
                            <h4>Courses</h4>
                        </div>
                        <div class="col-2">
                            <Input
                                type="select"
                                label='Choose category'
                                options={(Array.isArray(categoryList.category)) && categoryList?.category}
                                placeholder='All'
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            />
                        </div>
                        <div class="col-2">
                            <label>
                                Choose courses
                            </label>
                            <select name="default-datatable_length" aria-controls="default-datatable" class="form-control form-control-sm"
                                value={filter} onChange={(e) => setFilter(e.target.value)}
                            >
                                <option key="" value={''}>All</option>
                                <option key="on process" value={'on process'}>On process</option>
                                <option key="accomplish" value={'accomplish'}>Accomplish</option>
                            </select>

                        </div>
                    </div>
                    <div class="row">
                        {courseList?.data && courseList.data.map(course => (
                            <div class="col-12 col-lg-4">
                                <Card
                                    title={course.title}
                                    description={course.description}
                                    avatar={`${AWS_FOLDER.IMAGE}${course.createdBy.profile.avatar}`}
                                    createdBy={course.createdBy.profile.firstName + ' ' + course.createdBy.profile.lastName}
                                    status={(course.status === 'on process' && 'success') || (course.status === 'accomplish' && 'info')}
                                    children={(course.status === 'on process' && 'On process') || (course.status === 'accomplish' && 'Accomplish')}
                                    state={course._id}
                                />
                            </div>
                        ))}
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-5">
                            <div class="dataTables_info" id="default-datatable_info" role="status" aria-live="polite">
                                Showing {limit} of {total} courses
                    </div>
                        </div>
                        <div class="col-sm-12 col-md-7">
                            <ReactPaginate
                                previousLabel={'< Previous'}
                                nextLabel={'Next >'}
                                breakLabel={'...'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                pageCount={Math.ceil(total / limit)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination'}
                                subContainerClassName={'page-item'}
                                activeClassName={'page-item active'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                pageClassNam={'page-item'}
                                pageLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Course
