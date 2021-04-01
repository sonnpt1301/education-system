import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = ({ message }) => {
    return (
        <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ position: 'fixed', top: '50%', left: '50%' }}
        >
            <span className="sr-only">{message || 'Loading...99%'}</span>
        </Spinner>
    );
};

export default Loader;
