import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'

const CreateInfo = (infos) => {
    const { info, setInfo } = infos

    const append = () => {
        setInfo([...info, {amount: 0, size: 0, number: Date.now()}])
    }
    const remove = (number) => {
        setInfo(info.filter(item => item.number !== number))
    }
    const change = (key, value, number) => {
        setInfo(info.map(item => item.number === number ? {...item, [key]: value} : item))
    }

    return (
        <>
            <h5>Information</h5>
            <Button onClick={append} variant="outline-primary" size="sm" className="mb-2">
                Add
            </Button>
            {info.map(item => 
                <Row key={item.number} className="mb-2">
                    <Col>
                        <Form.Control
                            name={'size_' + item.number}
                            value={item.size}
                            onChange={e => change('size', e.target.value, item.number)}
                            placeholder="Size..."
                            size="sm"
                        />
                    </Col>      
                    <Col>
                        <Form.Control
                            name={'amount_' + item.number}
                            value={item.amount}
                            onChange={e => change('amount', e.target.value, item.number)}
                            placeholder="Amount..."
                            size="sm"
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => remove(item.number)} size="sm" variant="outline-danger">
                            Delete
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default CreateInfo
