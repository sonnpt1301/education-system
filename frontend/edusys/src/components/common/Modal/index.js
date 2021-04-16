import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const NewModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} {...props} >
            <Modal.Header closeButton className={props.bg && 'bg-info'}>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    )
}

export default NewModal
