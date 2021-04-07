import React from 'react'
import { BarLoader, PropagateLoader } from "react-spinners"

export const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarLoader color='#28a745' loading={true} width='100%' />
        </div>
    );
};








