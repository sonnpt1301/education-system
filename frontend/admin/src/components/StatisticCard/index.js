import React from 'react'
import CountUp from 'react-countup';

const StatisticCard = ({ icon, count, content, roundColor, iconColor }) => {
    return (
        <div class="col-12 col-lg-4 col-xl-4">
            <div class={`card gradient-${roundColor} rounded-0`}>
                <div class="card-body p-1">
                    <div class="media align-items-center bg-white p-4">
                        <div class="media-body">
                            <h5 class="mb-0 text-dark"><CountUp end={count} /></h5>
                            <p class="mb-0 text-dark">{content}</p>
                        </div>
                        <div class="w-icon"><i class={`${icon} text-gradient-${iconColor}`}></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticCard
