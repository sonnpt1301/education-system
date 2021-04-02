import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Bar, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategoryAction, getListCourseAction, getListUserAction } from '../../actions';
import Loader from '../../components/common/Loader';
import StatisticCard from '../../components/StatisticCard';

const Home = () => {

    const dispatch = useDispatch()

    const { courseList, loading } = useSelector(state => state.course)
    const { userList } = useSelector(state => state.user)
    const { categoryList } = useSelector(state => state.category)

    const [filter, setFilter] = useState('')



    useEffect(() => {
        dispatch(getListCategoryAction())
        dispatch(getListUserAction())
        dispatch(getListCourseAction({
            status: filter,
            isDeleted: false
        }))
    }, [filter])

    return (
        <Layout>
            {loading && <Loader />}
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <StatisticCard
                            roundColor='warning'
                            count={userList.total}
                            content='Total Users'
                            iconColor='warning'
                            icon='fa fa-users'
                        />
                        <StatisticCard
                            roundColor='danger'
                            count={courseList.total}
                            content='Total Courses'
                            iconColor='danger'
                            icon='zmdi zmdi-book'
                        />
                        <StatisticCard
                            roundColor='primary'
                            count={categoryList.total}
                            content='Total Categories'
                            iconColor='primary'
                            icon='zmdi zmdi-receipt'
                        />
                    </div>
                    <hr />
                    <div>
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
                    </div>
                    <div className="row">
                        <Bar
                            data={{
                                labels: courseList?.statisticCourse && courseList.statisticCourse.map(category => category._id.categoryName),
                                datasets: [{
                                    label: `Total ${filter} courses`,
                                    data: courseList?.statisticCourse && courseList.statisticCourse.map(x => x.count),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            height={400}
                            width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            fontColor: "black",
                                            beginAtZero: true
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: "black",
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    display: true,
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home
