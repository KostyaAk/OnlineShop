import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createUser, fetchUser, updateUser } from '../http/UserAPI'
import { useState, useEffect } from 'react'

const EditUser = (props) => {
    const { id, show, setShow, setChange } = props

    
    const [role, setRole] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(id) {
            fetchUser(id)
                .then(
                    data => {
                        setRole(data.role)
                        setValid(data.role !== '')
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setRole('')
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setRole(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = role.trim() === ('USER' && 'ADMIN')
        setValid(correct)
        if (correct) {
            const data = {
                role: role.trim()
            }
            const success = (data) => {
                // закрываем модальное окно создания-редактирования бренда
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список брендов
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            id ? updateUser(id, data).then(success).catch(error) : createUser(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Edit' : 'Create'} user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        role="role"
                        value={role}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Role..."
                        className="mb-3"
                    />
                    <Button type="submit">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditUser
