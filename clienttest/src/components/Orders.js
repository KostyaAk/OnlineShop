import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Orders = (props) => {

    if (props.items.length === 0) {
        return <p>List of orders is empty</p>
    }

    return (
        <Table bordered hover size="sm" className="mt-3">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Status</th>
                    <th>Sum</th>
                    <th>More detailed</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => 
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.prettyCreatedAt}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.status}</td>
                        <td>{item.amount}</td>
                        <td>
                            {props.admin ? (
                                <Link to={`/admin/order/${item.id}`}>More detailed</Link>
                            ) : (
                                <Link to={`/user/order/${item.id}`}>More detailed</Link>
                            )}
                            
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default Orders
