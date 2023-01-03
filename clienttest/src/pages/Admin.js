import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/UserAPI.js'

const Admin = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <h1>Controll panel</h1>
            <p>
                This is the store's control panel for the administrator
            </p>
            <ul>
                <li><Link to="/admin/orders">Orders in the store</Link></li>
                <li><Link to="/admin/categories">Catalog categories</Link></li>
                <li><Link to="/admin/brands">Catalog brands</Link></li>
                <li><Link to="/admin/products">Catalog products</Link></li>
                <li><Link to="/admin/users">Store users</Link></li>
            </ul>
            <Button onClick={handleLogout}>Exit</Button>
        </Container>
    )
}

export default Admin
