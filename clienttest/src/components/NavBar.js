import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
    const { user, basket } = useContext(AppContext)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to="/" className="navbar-brand">Shop</NavLink>
                <Nav className="ml-auto">
                    <NavLink to="/contacts" className="nav-link">Contacts</NavLink>
                    {user.isAuth ? (
                        <NavLink to="/user" className="nav-link">Personal account</NavLink>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">Log in</NavLink>
                            <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                        </>
                    )}
                    {user.isAdmin && (
                        <NavLink to="/admin" className="nav-link">Controll panel</NavLink>
                    )}
                    <NavLink to="/basket" className="nav-link">
                        Basket
                        {!!basket.count && <span>({basket.count})</span>}
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar
