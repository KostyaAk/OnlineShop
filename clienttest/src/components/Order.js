import React from 'react'
import { Table } from 'react-bootstrap'

const Order = (props) => {
    return (
        <>
            <ul>
                <li>Order date: {props.data.prettyCreatedAt}</li>
                <li>
                    Order status:
                    {props.data.status === 0 && <span>New</span>}
                    {props.data.status === 1 && <span>At work</span>}
                    {props.data.status === 2 && <span>Completed</span>}
                </li>
            </ul>
            <ul>
                <li>Firstname, lastname: {props.data.name}</li>
                <li>Email: {props.data.email}</li>
                <li>Phone number: {props.data.phone}</li>
                <li>Adress: {props.data.address}</li>
                <li>Comment: {props.data.comment}</li>
            </ul>
            <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Sum</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.items.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}</td>
                            <td>{item.size_product}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={3}>Total</td>
                        <td>{props.data.amount}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Order
