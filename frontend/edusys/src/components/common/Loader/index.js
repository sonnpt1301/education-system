import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = ({ message }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner
                animation="border"
                role="status"
                variant="primary"
            >
                <span className="sr-only">{message || 'Loading...99%'}</span>
            </Spinner>
        </div>
    );
};

export default Loader;
