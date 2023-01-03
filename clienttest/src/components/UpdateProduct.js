import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { fetchOneProduct, updateProduct, fetchCategories, fetchBrands } from '../http/CatalogAPI.js'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import UpdateProperties from './UpdateProperties.js'
import UpdateInfo from './UpdateInfo.js'
import { createProperty, updateProperty, deleteProperty } from '../http/CatalogAPI.js'
import { createInfo, updateInfo, deleteInfo } from '../http/CatalogAPI.js'


const defaultValue = {name: '', price: '', category: '', brand: ''}
const defaultValid = {name: null, price: null, category: null, brand: null}

const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== ''
        if (key === 'price') result.price = pattern.test(value.price.trim())
        if (key === 'category') result.category = pattern.test(value.category)
        if (key === 'brand') result.brand = pattern.test(value.brand)
    }
    return result
}

const updateProperties = async (properties, productId) => {
    for (const prop of properties) {
        const empty = prop.name.trim() === '' || prop.value.trim() === ''
        // если вдруг старая хар-ка оказалась пустая — удалим ее на сервере
        if (empty && prop.id) {
            try {
                await deleteProperty(productId, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.append && !empty) {
            try {
                await createProperty(productId, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.change && !prop.remove) {
            try {
                await updateProperty(productId, prop.id, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.remove) {
            try {
                await deleteProperty(productId, prop.id)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
    }
}

const updateInfos = async (infos, productId) => {
    for (const info of infos) {
        const empty = info.amount === 0 || info.size === 0
        // если вдруг старая хар-ка оказалась пустая — удалим ее на сервере
        if (empty && info.id) {
            try {
                await deleteInfo(productId, info)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (info.append && !empty) {
            try {
                await createInfo(productId, info)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (info.change && !info.remove) {
            try {
                await updateInfo(productId, info.id, info)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (info.remove) {
            try {
                await deleteInfo(productId, info.id)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
    }
}

const UpdateProduct = (props) => {
    const { id, show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)

    // список категорий и список брендов для возможности выбора
    const [categories, setCategories] = useState(null)
    const [brands, setBrands] = useState(null)

    // выбранное для загрузки изображение товара
    const [image, setImage] = useState(null)

    // список характеристик товара
    const [properties, setProperties] = useState([])

    const [infos, setInfos] = useState([])

    useEffect(() => {
        if(id) {
            // нужно получить с сервера данные товара для редактирования
            fetchOneProduct(id)
                .then(
                    data => {
                        const prod = {
                            name: data.name,
                            price: data.price.toString(),
                            category: data.categoryId.toString(),
                            brand: data.brandId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                        setProperties(data.props.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                        setInfos(data.info.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
            // нужно получить с сервера список категорий и список брендов
            fetchCategories()
                .then(
                    data => setCategories(data)
                )
            fetchBrands()
                .then(
                    data => setBrands(data)
                )
        }
    }, [id])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.size]: event.target.amount, [event.target.name]: event.target.value}

        //const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const correct = isValid(value)
        setValid(correct)

        // если введенные данные прошли проверку — можно отправлять их на сервер
        if (correct.name && correct.price && correct.category && correct.brand) {
            const data = new FormData()
            data.append('name', value.name.trim())
            data.append('price', value.price.trim())
            data.append('categoryId', value.category)
            data.append('brandId', value.brand)
            if (image) data.append('image', image, image.name)
            if (properties.length) {
                await updateProperties(properties, id)
            }

            if (infos.length) {
                await updateInfos(infos, id)
            }

            updateProduct(id, data)
                .then(
                    data => {
                        // изменяем состояние, чтобы обновить список товаров
                        setChange(state => !state)
                        event.target.image.value = ''
                        const prod = {
                            name: data.name,
                            price: data.price.toString(),
                            category: data.categoryId.toString(),
                            brand: data.brandId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                        // мы получим актуальные значения хар-тик с сервера, потому что обновление
                        // хар-тик завершилось еще до момента отправки этого http-запроса на сервер
                        setProperties(data.props.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                        setInfos(data.info.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                        // закрываем модальное окно редактирования товара
                        setShow(false)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="Product name..."
                        className="mb-3"
                    />
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="category"
                                value={value.category}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.category === true}
                                isInvalid={valid.category === false}
                            >
                                <option value="">Category</option>
                                {categories && categories.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="brand"
                                value={value.brand}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.brand === true}
                                isInvalid={valid.brand === false}
                            >
                                <option value="">Brand</option>
                                {brands && brands.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="price"
                                value={value.price}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.price === true}
                                isInvalid={valid.price === false}
                                placeholder="Product price..."
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Product image..."
                            />
                        </Col>
                    </Row>
                    <UpdateInfo infos={infos} setInfos={setInfos} />
                    <UpdateProperties properties={properties} setProperties={setProperties} />
                    <Row>
                        <Col>
                            <Button type="submit">Save</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateProduct
