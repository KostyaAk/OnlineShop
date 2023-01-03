import React from 'react'
import { useContext, useState } from 'react'
import { AppContext } from './AppContext.js'
import { increment, decrement, remove } from '../http/BasketAPI.js'
import { Table, Spinner, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BasketItem from './BasketItem.js'
import { observer } from 'mobx-react-lite'

const BasketList = observer(() => {
    const { basket } = useContext(AppContext)
    const [fetching, setFetching] = useState(false)

    const navigate = useNavigate()

    const handleIncrement = (id, size_product) => {
        setFetching(true)
        increment(id, size_product)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleDecrement = (id, size_product) => {
        setFetching(true)
        decrement(id, size_product)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleRemove = (id, size_product) => {
        setFetching(true)
        remove(id, size_product)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            {basket.count ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Price</th>
                                <th>Sum</th>
                                <th>Delete</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basket.products.map(item => 
                                <BasketItem
                                    key={item.id + '-' + item.size_product}
                                    increment={handleIncrement}
                                    decrement={handleDecrement}
                                    remove={handleRemove}
                                    {...item}
                                />
                            )}
                            <tr>
                                <th colSpan="3">Итого</th>
                                <th>{basket.sum}</th>
                                <th>руб.</th>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={() => navigate('/checkout')}>Place an order</Button>
                </>
            ) : (
                <p>Your basket is empty</p>
            )}
        </>
    )
})

export default BasketList
