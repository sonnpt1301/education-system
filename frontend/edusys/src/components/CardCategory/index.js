import React from 'react'
import { Card } from 'react-bootstrap'
import './style.css'

const CardCategory = ({ title }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title class="title">{title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default CardCategory
