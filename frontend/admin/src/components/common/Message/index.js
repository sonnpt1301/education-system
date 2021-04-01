import React from 'react';
import './style.css'

const Message = ({ variant, children }) => {
    return (
        <div class={`alert alert-${variant} alert-dismissible box`} role="alert">
            {children}
        </div>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
