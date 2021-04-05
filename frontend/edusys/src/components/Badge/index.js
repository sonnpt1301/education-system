import React from 'react'

const Badge = ({ status, children }) => {
    return (
        <span class={`badge badge-${status} shadow-${status} m-1`}>{children}</span>
    )
}

Badge.defaultProps = {
    status: 'info',
};

export default Badge
