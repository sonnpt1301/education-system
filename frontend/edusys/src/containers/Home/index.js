
import React, { useEffect, useState } from 'react'

import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getListCategoryAction, getListCourseAction, getListUserAction } from '../../actions'
import Card from '../../components/Card'
import CardCategory from '../../components/CardCategory'
import InfoTutor from '../../components/InfoTutor'
import Layout from '../../components/Layout'
import { AWS_FOLDER } from '../../config'
import { Loader } from '../../components/common/Loader'
import './style.css'
const Home = () => {
    const dispatch = useDispatch()
    const { courseList, loading } = useSelector(state => state.course)
    const { categoryList } = useSelector(state => state.category)
    const { userList } = useSelector(state => state.user)

    const [limit, setLimit] = useState(6)


    useEffect(() => {
        dispatch(getListUserAction({
            role: 'tutors',
            limit
        }))
        dispatch(getListCategoryAction({
            limit
        }))
        dispatch(getListCourseAction({
            limit
        }))
    }, [])

    return (
        <Layout>
            { loading && <Loader />}
            <div class="content-wrapper">
                <div class="container-fluid">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/313.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/313.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/313.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <hr />
                    <h6 class="text-uppercase textAlign">Newest Course</h6>
                    <div class="row">
                        {courseList?.data && courseList.data.map(course => (
                            <div class="col-12 col-lg-4">
                                <Card
                                    title={course.title}
                                    description={course.description}
                                    avatar={`${AWS_FOLDER.IMAGE}${course.createdBy.profile.avatar}`}
                                    createdBy={course.createdBy.profile.firstName + ' ' + course.createdBy.profile.lastName}
                                    state={course._id}
                                    totalUser={course.totalUser}
                                />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <h6 class="text-uppercase textAlign">Explore Top Categories</h6>
                    <div class="row">
                        {categoryList?.category && categoryList.category.map(category => (
                            <div class="col-12 col-lg-4">
                                <CardCategory title={category.name} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <h6 class="text-uppercase textAlign">Student say about us</h6>
                    <div class="row" style={{ justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                    <hr />
                    <h6 class="text-uppercase textAlign">Tutors</h6>
                    <div class="row">
                        {
                            userList?.data && userList.data.map(user => (
                                <div class="col-12 col-lg-4" style={{ display: 'flex', marginTop: '30px', marginBottom: '30px', paddingLeft: '80px' }}>
                                    <InfoTutor
                                        tutorName={user.profile.firstName + ' ' + user.profile.lastName}
                                        avatar={`${AWS_FOLDER.IMAGE}${user.profile.avatar}`}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home
