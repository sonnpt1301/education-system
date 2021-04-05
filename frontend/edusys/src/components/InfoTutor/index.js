import React from 'react'

const InfoTutor = ({ tutorName, avatar }) => {
    return (
        <>
            <img class="mr-3 rounded-circle" src={avatar} style={{width: '110px', height: '110px'}} alt="user avatar" />
            <div class="media-body" style={{ alignSelf: 'center' }}>
                <h5 class="mt-0 mb-1">{tutorName}</h5>
            </div>
        </>
    )
}

export default InfoTutor
