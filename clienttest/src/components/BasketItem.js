import React from 'react';
import { Button } from 'react-bootstrap'

const BasketItem = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>
                <Button variant="outline-dark" size="sm" onClick={() => props.decrement(props.id, props.size_product)}>-</Button>
                {' '}<strong>{props.quantity}</strong>{' '}
                <Button variant="outline-dark" size="sm" disabled={ (props.amount <= 0)} onClick={() => props.increment(props.id, props.size_product)}>+</Button>
            </td>
            <td>{props.price}</td>
            <td>{props.price * props.quantity}</td>
            <td>
                <Button variant="link" onClick={() => props.remove(props.id, props.size_product)}>
                    Delete
                </Button>
            </td>
            <td>{props.size_product}</td>
        </tr>
    );
}

export default BasketItem
