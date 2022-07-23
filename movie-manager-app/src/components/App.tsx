import React, {useEffect, useState} from "react";
import {NavLink, Route, Routes, useLocation, useNavigate,} from "react-router-dom";
import MoviesGrid from "./movie-grid/MoviesGrid";
import {Container, Form, Nav, Navbar} from "react-bootstrap";
import Logo from "./common/Logo";
import MovieDetails from "./movie-details/MovieDetails";


const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {pathname} = useLocation();
    const navigate = useNavigate();

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Query - ", event.target.value);
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        setSearchQuery('');
        console.log(pathname);
    }, [pathname])

    const navigateBack = () => {
        navigate(-1);
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    {
                        pathname.includes('details') ? (
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link defaultChecked={true} onClick={navigateBack}
                                              style={{color: "blue"}}>&lt; Go Back</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        ) : (
                            <>
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
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                            name="searchQuery"
                                            value={searchQuery}
                                            onChange={updateValue}
                                        />
                                    </Form>
                                </Navbar.Collapse>
                            </>
                        )
                    }
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<MoviesGrid type="movies-in-theaters" searchQuery={searchQuery}/>}></Route>
                <Route path="/movies-in-theaters"
                       element={<MoviesGrid type="movies-in-theaters" searchQuery={searchQuery}/>}></Route>
                <Route path="/coming-soon" element={<MoviesGrid type="coming-soon" searchQuery={searchQuery}/>}></Route>
                <Route path="/top-rated-indian"
                       element={<MoviesGrid type="top-rated-indian" searchQuery={searchQuery}/>}></Route>
                <Route path="/top-rated-movies"
                       element={<MoviesGrid type="top-rated-movies" searchQuery={searchQuery}/>}></Route>
                <Route path="/favourites" element={<MoviesGrid type="favourites" searchQuery={searchQuery}/>}></Route>
                <Route path="/details/:type/:id" element={<MovieDetails/>}></Route>
            </Routes>
        </>
    );
}

export default App;
