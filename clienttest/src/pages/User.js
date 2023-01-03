import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/UserAPI.js'

const User = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <h1>Personal account</h1>
            <p>
                This is the personal account of a regular customer of the store
            </p>
            <ul>
                <li><Link to="/user/orders">Orders history</Link></li>
            </ul>
            <Button onClick={handleLogout}>Exit</Button>
        </Container>
    )
}

export default User
