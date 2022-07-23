import React, {useEffect, useState} from "react";
import {Categories, LoadingStatus} from "../../models/types";
import IMovie from "../../models/IMovie";

import {
    addToFavouritesApiCall,
    getComingSoon,
    getFavourites,
    getMoviesInTheaters,
    getTopRatedIndia,
    getTopRatedMovies,
    removeFromFavouritesApiCall
} from "../../services/movies";
import {Card, Col, Container, Row, Toast, ToastContainer} from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import IToast from "../../models/IToast";

import './movie-item.css'
import {Link} from "react-router-dom";

type Props = {
    type: Categories,
    searchQuery: string
}

const MoviesGrid = ({type, searchQuery}: Props) => {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("LOADING");
    const [error, setError] = useState<Error | null>(null);
    const [finalMovies, setFinalMovies] = useState<IMovie[]>([]);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [toasts, setToasts] = useState<IToast[]>([]);

    // let movies: IMovie[] = [];

    const addToToasts = (message: string, type: 'success' | 'danger') => {
        let toastsNew = [...toasts];
        let toast: IToast = {
            toastMessage: message,
            toastType: type,
            id: new Date().getTime()
        }
        toastsNew.push(toast);
        setToasts(toastsNew);
    }

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
            setFinalMovies(data);
            setLoadingStatus("LOADED");
        } catch (error) {
            setLoadingStatus("ERROR_LOADING");
            setError(error as Error);
            addToToasts(error.message, "danger");
        }
    }

    useEffect(() => {
        loadMovies();
    }, [type]);

    const filterMovies = () => {
        // console.log(movies);
        if (searchQuery.trim() !== '') {
            let filteredMovies: IMovie[] = movies.filter((movie: IMovie) => {
                return movie.title.toLowerCase().includes(searchQuery);
            });
            setFinalMovies(filteredMovies);
        } else {
            setFinalMovies(movies);
        }
    }

    useEffect(() => {
        filterMovies();
    }, [searchQuery]);


    const hideToast = (event: React.MouseEvent | React.KeyboardEvent | undefined, id: number) => {
        let toastsNew = [...toasts];
        let idxToBeSpliced = null;
        for (let i = 0; i < toasts.length; i++) {
            let toastItem = toasts[i];
            if (toastItem.id === id) {
                idxToBeSpliced = i;
                break;
            }
        }
        if (idxToBeSpliced != null) {
            toastsNew.splice(idxToBeSpliced, 1);
        }
        setToasts(toastsNew);
    }

    const removeFromFavourites = async (event: React.MouseEvent<HTMLDivElement>, movie: IMovie) => {
        try {
            const data = await removeFromFavouritesApiCall(movie);
            addToToasts("Removed from favourites Successfully", "success");
            loadMovies();
        } catch (error) {
            addToToasts("Error while adding to favourites", "danger");
        }
    }

    const addToFavourites = async (event: React.MouseEvent<HTMLDivElement>, movie: IMovie) => {
        const favouritesList = await getFavourites();
        for (let movieItem of favouritesList) {
            if (movie.posterurl === movieItem.posterurl) {
                addToToasts("Already added to favourites", 'success');
                return;
            }
        }

        try {
            const data = await addToFavouritesApiCall(movie);
            addToToasts("Added to favourites Successfully", 'success');
        } catch (error) {
            if (error.response.status === 500) {
                addToToasts("Already added to favourites", 'success');
            } else {
                addToToasts("Error while adding to favourites", 'danger');
            }

        }
    }

    const getShowToast = (id: number) => {
        for (let i = 0; i < toasts.length; i++) {
            let toastItem = toasts[i];
            if (toastItem.id === id) {
                return true;
            }
        }
        return false;
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
                    finalMovies.length > 0 && (
                        <Row xs={1} sm={2} md={4} lg={5} xl={6}>
                            {
                                finalMovies.map(
                                    (movie: IMovie, idx: number) => (
                                        <Col className="d-flex align-items-stretch my-3" key={idx}>
                                            <Card style={{width: '18rem'}} className="card">
                                                <Link to={`/details/${type}/${movie.id}`}>
                                                    <Card.Img variant="top" src={`${movie.posterurl}`} height='300px'/>
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to={`/details/${type}/${movie.id}`} style={{ textDecoration: 'none', color: "black"}}>
                                                            <div style={{fontSize: '1rem'}}>
                                                                {movie.title}
                                                            </div>
                                                        </Link>
                                                        {
                                                            type === "favourites" ? (
                                                                <div
                                                                    style={{display: 'flex', justifyContent: 'center'}}>
                                                                    <div className="btn btn-outline-info btn-sm mt-3"
                                                                         onClick={event => removeFromFavourites(event, movie)}>
                                                                        <FontAwesomeIcon className="me-2"
                                                                                         icon={faTrashCan}
                                                                                         style={{color: "red"}}/>
                                                                        <span
                                                                            style={{color: "grey"}}>Remove From favourites</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    style={{display: 'flex', justifyContent: 'center'}}>
                                                                    <div className="btn btn-outline-info btn-sm mt-3"
                                                                         onClick={event => addToFavourites(event, movie)}>
                                                                        <FontAwesomeIcon className="me-2" icon={faHeart}
                                                                                         style={{color: "red"}}/>
                                                                        <span
                                                                            style={{color: "grey"}}>Add to favourites</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    )
                }
                {
                    toasts.length > 0 && (
                        <ToastContainer className="p-3 me-5" position="top-end">
                            {
                                toasts.map(({toastMessage, toastType, id}: IToast, idx) => (
                                    <Toast
                                        bg={toastType}
                                        show={getShowToast(id)}
                                        autohide
                                        delay={1500}
                                        onClose={(event) => hideToast(event, id)}
                                        className="mt-5"
                                        key={idx}
                                    >
                                        <Toast.Header closeButton={true}>
                                            {toastType === 'success' ? 'Success' : 'Error'}
                                        </Toast.Header>
                                        <Toast.Body>{toastMessage}</Toast.Body>
                                    </Toast>
                                ))
                            }

                        </ToastContainer>
                    )
                }
                {
                    finalMovies.length == 0 && (
                        <div style={{display: 'flex', justifyContent: 'center'}}>No Movies Found!!</div>
                    )
                }
            </Container>
        </>
    );
}

export default MoviesGrid;
