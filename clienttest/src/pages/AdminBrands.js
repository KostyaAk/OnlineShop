import React from 'react'
import { useState, useEffect } from 'react'
import { fetchBrands, deleteBrand } from '../http/CatalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditBrand from '../components/EditBrand.js'

const AdminBrands = () => {
    const [brands, setBrands] = useState(null) // список загруженных брендов
    const [fetching, setFetching] = useState(true) // загрузка списка брендов с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id бренда, который будем редактировать — для передачи в <EditBrand id={…} />
    const [brandId, setBrandId] = useState(0)

    const handleCreateClick = () => {
        setBrandId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setBrandId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteBrand(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Brand «${data.name}» deleted`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchBrands()
            .then(
                data => setBrands(data)
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
            <h1>Brands</h1>
            <Button onClick={() => handleCreateClick()}>Create brand</Button>
            <EditBrand id={brandId} show={show} setShow={setShow} setChange={setChange} />
            {brands.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
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
                <p>List of brands is empty</p>
            )}
        </Container>
    )
}

export default AdminBrands
