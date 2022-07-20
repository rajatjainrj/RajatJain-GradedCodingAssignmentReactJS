import React, {useEffect, useState} from "react";
import {Categories, LoadingStatus} from "../../models/types";
import IMovie from "../../models/IMovie";

import {
    getComingSoon,
    getFavourites,
    getMoviesInTheaters,
    getTopRatedIndia,
    getTopRatedMovies
} from "../../services/movies";
import {Col, Container, Row, Toast, ToastContainer} from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import MovieItem from "./MovieItem";

type Props = {
    type: Categories
}

const MoviesGrid = ({type}: Props) => {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("LOADING");
    const [error, setError] = useState<Error | null>(null);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const loadMovies = async () => {
        setLoadingStatus("LOADING");
        try {
            let data;
            if (type === "movies-in-theaters") {
                data = await getMoviesInTheaters();
            } else if (type === "coming-soon") {
                data = await getComingSoon();
            } else if (type === "top-rated-indian") {
                data = await getTopRatedIndia();
            } else if (type === "top-rated-movies") {
                data = await getTopRatedMovies();
            } else if (type === "favourites") {
                data = await getFavourites();
            } else {
                data = await getMoviesInTheaters();
            }
            setMovies(data);
            setLoadingStatus("LOADED");
        } catch (error) {
            setLoadingStatus("ERROR_LOADING");
            setError(error as Error);
            setShowToast(true);
            setToastMessage(error.message);
        }
    }

    useEffect(() => {
        loadMovies();
    }, [type]);


    const hideToast = () => {
        setShowToast(false);
    }

    return (
        <>
            <Container fluid className="mt-2">
                {
                    loadingStatus === "LOADING" && (
                        <LoadingIndicator size="large" message="We are fetching the movies, please wait..."/>
                    )
                }
                {
                    movies.length > 0 && (<Row xs={1} sm={2} md={4} lg={5} xl={6}>
                            {
                                movies.map(
                                    (movie: IMovie) => (
                                        <>
                                            <Col className="d-flex align-items-stretch my-3">
                                                <MovieItem movie={movie} key={movie.id}/>
                                            </Col>
                                        </>
                                    )
                                )
                            }
                            <hr/>
                            {
                                showToast && (
                                    <ToastContainer className="p-3 me-5" position="top-end">
                                        <Toast
                                            bg={loadingStatus === 'LOADED' ? 'success' : 'danger'}
                                            show={showToast}
                                            autohide
                                            delay={2000}
                                            onClose={hideToast}
                                            className="mt-5"
                                        >
                                            <Toast.Header closeButton={false}>
                                                {loadingStatus === 'LOADED' ? 'Success' : 'Error'}
                                            </Toast.Header>
                                            <Toast.Body>{toastMessage}</Toast.Body>
                                        </Toast>
                                    </ToastContainer>
                                )
                            }
                        </Row>
                    )
                }
                {
                    movies.length == 0 && (
                        <div style={{display: 'flex', justifyContent: 'center'}}>No Movies Found!!</div>
                    )
                }
            </Container>
        </>
    );
}

export default MoviesGrid;
