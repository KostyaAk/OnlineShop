import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import uuid from 'react-uuid'

const UpdateInfo = (info) => {
    const { infos, setInfos } = info
    const append = () => {
        setInfos([...infos, {id: null, size: 0, amount: 0, unique: uuid(), append: true}])
    }
    const remove = (unique) => {
        // новую хар-ку надо просто удалить из массива properties, а старую — оставить, но
        // изменить remove на true, чтобы потом выполнить http-запрос на сервер для удаления
        const item = infos.find(elem => elem.unique === unique)
        if (item.id) { // старая хар-ка
            setInfos(infos.map(
                elem => elem.unique === unique ? {...elem, change: false, remove: true} : elem
            ))
        } else { // новая хар-ка
            setInfos(infos.filter(elem => elem.unique === unique))
        }
    }
    const change = (key, value, unique) => {
        setInfos(infos.map(
            item => item.unique === unique ? {...item, [key]: value, change: !item.append} : item
        ))
    }

    return (
        <>
            <h5>Information</h5>
            <Button onClick={append} variant="outline-primary" size="sm" className="mb-2">
                Add
            </Button>
            {infos.map(item =>
                <Row key={item.unique} className="mb-2" style={{display: item.remove ? 'none': 'flex'}}>
                    <Col>
                        <Form.Control
                            name={'size_' + item.unique}
                            value={item.size}
                            onChange={e => change('size', e.target.value, item.unique)}
                            placeholder="Size..."
                            size="sm"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            name={'amount_' + item.unique}
                            value={item.amount}
                            onChange={e => change('amount', e.target.value, item.unique)}
                            placeholder="Amount..."
                            size="sm"
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => remove(item.unique)} size="sm" variant="outline-danger">
                            Delete
                        </Button>
                        {item.change && ' *'}
                    </Col>
                </Row>
            )}
        </>
    )
}

export default UpdateInfo
