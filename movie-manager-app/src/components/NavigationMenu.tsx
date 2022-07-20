import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Logo from "./common/Logo";

const NavigationMenu = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand to="/" as={NavLink}>
                    <Logo/>
                    Movie Buddy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link defaultChecked={true} to="/movies-in-theaters" as={NavLink}>Movies in
                            theatres</Nav.Link>
                        <Nav.Link to="/coming-soon" as={NavLink}>Coming soon</Nav.Link>
                        <Nav.Link to="/top-rated-indian" as={NavLink}>Top rated Indian</Nav.Link>
                        <Nav.Link to="/top-rated-movies" as={NavLink}>Top rated Movies</Nav.Link>
                        <Nav.Link to="/favourites" as={NavLink}>Favourites</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationMenu;
