import React from 'react'
import { useState, useEffect } from 'react'
import { fetchUsers, deleteUser } from '../http/UserAPI'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditUser from '../components/EditUser.js'

const AdminUsers = () => {
    const [users, setUsers] = useState(null) // список загруженных пользователей
    const [fetching, setFetching] = useState(true) // загрузка списка пользователей с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id пользователя, который будем редактировать — для передачи в <EditUser id={…} />
    const [userId, setUserId] = useState(0)

    const handleCreateClick = () => {
        setUserId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setUserId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteUser(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`User «${data.email}» deleted`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchUsers()
            .then(
                data => setUsers(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Users</h1>
            <EditUser id={userId} show={show} setShow={setShow} setChange={setChange} />
            {users.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => 
                        <tr key={item.id}>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>List of users is empty</p>
            )}
        </Container>
    )
}

export default AdminUsers
