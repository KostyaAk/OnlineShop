import { Modal, Button } from 'react-bootstrap'

const CreateOrder = (props) => {
    const { show, setShow } = props
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Order creation form</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                <Button variant="primary">Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateOrder
