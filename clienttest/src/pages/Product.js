import React from 'react'
import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { fetchOneProduct, fetchProdRating } from '../http/CatalogAPI.js'
import { useParams } from 'react-router-dom'
import { appendSize } from '../http/BasketAPI.js'
import { AppContext } from '../components/AppContext.js'
import {createRating} from '../http/CatalogAPI.js'
import "../styles/details.css";

const Product = () => {
    const { id } = useParams()
    const { user, basket } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState(null)
    const [state] = useState({amount_checked: 1})

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchProdRating(id, user.id? user.id : 0).then(data => setRating(data))
    }, [id, user.id])

    const handleClick = (productId, size_product) => {  
        appendSize(productId, size_product).then(data => {
            basket.products = data.products
        })
    }

    const ratingClick = (productId, rate) => {
        createRating(productId, rate)
    }

    ///////////////////////
    const getInitialState = () => {
        const value = "non";
        return value;
    };
    
    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        setValue(e.target.value);
        state.amount_checked = optionElement.getAttribute('amount');
    };

    if (!product) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col lg={4}>
                    {product.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" alt="Tut tipo foto" />
                    )}
                </Col>
                <Col lg={8}>
                    <h1>{product.name}</h1>
                    <h3>{product.price}.00 rub.</h3>
                    <p>Brand: {product.brand.name}</p>
                    <p>Category: {product.category.name}</p>
                    <div>
                        {rating ? (
                            <p>Rating: {rating.rating}, votes {rating.votes}</p>
                        ) : (
                            <Spinner animation="border" />
                        )}
                    </div>
                    {rating ? (
                    <div className="star-rating">
                        <input className="star-rating-input" id="star-rating-5" type="radio" name="rating" rate="5" disabled={rating.userRate !== 0} defaultChecked={rating.userRate === 5} onClick={(e) => ratingClick(product.id, e.target.getAttribute('rate')) }></input>
                        <label className="star-rating-icon fa fa-star" htmlFor="star-rating-5"></label>
                        <input className="star-rating-input" id="star-rating-4" type="radio" name="rating" rate="4" disabled={rating.userRate !== 0} defaultChecked={rating.userRate === 4} onClick={(e) => ratingClick(product.id, e.target.getAttribute('rate')) }></input>
                        <label className="star-rating-icon fa fa-star" htmlFor="star-rating-4"></label>
                        <input className="star-rating-input" id="star-rating-3" type="radio" name="rating" rate="3" disabled={rating.userRate !== 0} defaultChecked={rating.userRate === 3} onClick={(e) => ratingClick(product.id, e.target.getAttribute('rate')) }></input>
                        <label className="star-rating-icon fa fa-star" htmlFor="star-rating-3"></label>
                        <input className="star-rating-input" id="star-rating-2" type="radio" name="rating" rate="2" disabled={rating.userRate !== 0} defaultChecked={rating.userRate === 2} onClick={(e) => ratingClick(product.id, e.target.getAttribute('rate')) }></input>
                        <label className="star-rating-icon fa fa-star" htmlFor="star-rating-2"></label>
                        <input className="star-rating-input" id="star-rating-1" type="radio" name="rating" rate="1" disabled={rating.userRate !== 0} defaultChecked={rating.userRate === 1} onClick={(e) => ratingClick(product.id, e.target.getAttribute('rate')) }></input>
                        <label className="star-rating-icon fa fa-star" htmlFor="star-rating-1"></label>
                    </div>
                    ): (
                        <Spinner animation="border" />
                    )}
                    <div>
                        <select 
                            value={value} onChange={handleChange}
                            name="Basket_size">
                            <option key={'default'} value='non' amount = {1}>Choose size</option>
                            {product.info.map(item => 
                                        <option key={item.size} value={item.size} amount={item.amount}>{item.size}</option>
                                    )}
                        </select>
                    </div>   
                    <p style={{visibility: ((state.amount_checked <=0) ? "visible" : "hidden")}}>Out of stock</p>
                    <Button disabled={ (value === 'non') || (state.amount_checked<=0)} onClick={() =>
                        handleClick(product.id, value)}>Add to basket
                    </Button>
                    
                </Col>
            </Row>
            {!!product.info.length &&
                <Row>
                    <Col>
                        <h3>Information</h3>
                            <Table bordered hover size="sm">
                                <tbody>
                                        <tr >
                                            <td>Size</td>
                                            <td>Amount</td>
                                        </tr>
                                    {product.info.map(item => 
                                        <tr key={item.id}>
                                            <td>{item.size}</td>
                                            <td>{item.amount}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                    </Col>
                </Row>
            }
            {!!product.props.length &&
                <Row>
                    <Col>
                        <h3>Characteristics</h3>
                            <Table bordered hover size="sm">
                                <tbody>
                                    {product.props.map(item => 
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Product
