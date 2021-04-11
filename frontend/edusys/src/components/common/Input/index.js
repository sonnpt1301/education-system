import React from 'react'
import { Form } from 'react-bootstrap'

const Input = (props) => {
    let input = null

    switch (props.type) {
        case 'select':
            input = <Form.Group>
                {props.label && <Form.Label>{props.label} {props.important && <span style={{ color: 'red' }}>*</span>}</Form.Label>}
                <select
                    className="form-control form-control-sm"
                    defaultValue={props.value}
                    onChange={props.onChange}
                    {...props}
                >
                    <option value="">{props.placeholder}</option>
                    {
                        props.options.length > 0 ?
                            props.options.map((option, index) =>
                                <option key={index} value={option._id}>{option.name || option.topic}</option>
                            ) : null
                    }
                </select>
            </Form.Group>
            break;
        case 'textarea':
            input = <div class="form-group">
                <label>{props.label} {props.important && <span style={{ color: 'red' }}>*</span>}</label>
                <textarea className="form-control"
                    rows={props.rows}
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                >
                </textarea>
            </div>
            break;
        case 'file':
            input = <div class="form-group">
                <label>{props.label} {props.important && <span style={{ color: 'red' }}>*</span>}</label>
                <input id={props.id} type={props.type} className="form-control" placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.onChange}
                    {...props}
                />
            </div>
            break;
        case 'date':
            input =
                <div class="form-group">
                    <label>{props.label} {props.important && <span style={{ color: 'red' }}>*</span>}</label>
                    <input
                        className="form-control"
                        placeholder={props.placeholder}
                        type={props.type}
                        value={props.value}
                        onChange={props.onChange}
                        {...props}
                    />
                </div>

            break;
        default:
            input = <div class="form-group">
                <label>{props.label} {props.important && <span style={{ color: 'red' }}>*</span>}</label>
                <input type={props.type} className="form-control" placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                />
            </div>
            break;
    }

    return input
}

export default Input
