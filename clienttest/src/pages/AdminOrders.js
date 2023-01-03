import React from 'react'
import { useState, useEffect } from 'react'
import { adminGetAll as getAllOrders } from '../http/OrderAPI.js'
import { Container, Spinner } from 'react-bootstrap'
import Orders from '../components/Orders.js'

const AdminOrders = () => {
    const [orders, setOrders] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        getAllOrders()
            .then(
                data => setOrders(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>All orders</h1>
            <Orders items={orders} admin={true} />
        </Container>
    )
}

export default AdminOrders
