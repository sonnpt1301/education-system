import React from 'react'

const Button = ({ icon, status, children, onClick, long, right }) => {
    return (
        <button type="button" class={`btn btn-${status} ${long && 'btn-block'} waves-effect waves-light m-1 ${right && 'pull-right'}`} onClick={onClick}>
            <i class={icon}></i> <span>{children}</span>
        </button>
    )
}

export default Button


