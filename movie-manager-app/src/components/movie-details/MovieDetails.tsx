import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {LoadingStatus} from "../../models/types";
import IMovie from "../../models/IMovie";
import {getMovieByTypeAndId} from "../../services/movies";
import LoadingIndicator from "../common/LoadingIndicator";
import {Alert, Badge, Col, Row} from "react-bootstrap";

import './movie-details.css';
import Viewer from "react-viewer";

const MovieDetails = () => {
    const [movie, setMovie] = useState<IMovie | null>(null)
    const [status, setStatus] = useState<LoadingStatus>("LOADING")
    const [error, setError] = useState<Error | null>(null)
    const {type, id} = useParams();
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
        const loadMovie = async () => {

            try {
                const data = await getMovieByTypeAndId(type as string, id as string);
                setMovie(data);
                setStatus("LOADED");
            } catch (error) {
                setError(error as Error);
                setStatus("ERROR_LOADING");
            }
        };
        loadMovie();
    }, []);

    let el;

    function sum(numbers: number[]) {
        let sum = 0;
        numbers.forEach((a: number) => {
            sum = sum + a;
        })
        return sum;
    }

    const openImageViewer = () => {
        setIsViewerOpen(true);
    }

    switch (status) {
        case "LOADING":
            el = (
                <LoadingIndicator size="large" message="We are fetching the details of Movie, please wait..."/>
            );
            break;
        case "LOADED":
            const {
                id,
                title,
                duration,
                releaseDate,
                posterurl,
                genres,
                actors,
                ratings,
                imdbRating,
                year,
                storyline,
                contentRating
            } = movie as IMovie;
            el = (
                <>
                    <Row>
                        <Col xs={12} className="m-2 ms-4">
                            <h1>{title}</h1>
                            <hr/>
                        </Col>
                        <Col xs={12} md={5} xl={4}>
                            <div className="content-img" onClick={openImageViewer}>
                                <img src={`${posterurl}`}
                                     alt={title}
                                     className="w-60 ms-3"
                                />
                                <div>Click to Enlarge</div>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={7} className="my-2 ms-4 me-4">
                            <Row>
                                <Col md={6} xs={6} className="my-2">
                                    <div className="heading">Duration</div>
                                    <div>
                                        {duration}
                                    </div>
                                </Col>
                                <Col md={6} xs={6} className="my-2">
                                    <div className="heading">Release Date</div>
                                    <div>
                                        {releaseDate}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} xs={12} className="my-2">
                                    <div className="heading">Genres</div>
                                    <div>
                                        {
                                            genres.map(
                                                (genre: string) => (
                                                    <Badge bg="primary me-2" key={genre}>{genre}</Badge>
                                                )
                                            )
                                        }
                                    </div>
                                </Col>
                                <Col md={6} xs={12} className="my-2">
                                    <div className="heading">Actors</div>
                                    <div>
                                        {
                                            actors.map(
                                                (actor: string) => (
                                                    <Badge bg="primary me-2" key={actor}>{actor}</Badge>
                                                )
                                            )
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <div className="my-2 mt-4">
                                <div className="heading">Story Line</div>
                                {storyline}
                            </div>
                            <Row>
                                <Col md={4} xs={6} className="my-2">
                                    <div className="heading">IMDB Rating</div>
                                    <div>
                                        {imdbRating}
                                    </div>
                                </Col>
                                <Col md={4} xs={6} className="my-2">
                                    <div className="heading">Content Rating</div>
                                    <div>
                                        {contentRating}
                                    </div>
                                </Col>
                                <Col md={4} xs={6} className="my-2">
                                    <div className="heading">Avg Rating</div>
                                    <div>
                                        {Math.round(sum(ratings) / ratings.length)}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {
                        isViewerOpen && (
                            <Viewer
                                visible={isViewerOpen}
                                onClose={() => {
                                    setIsViewerOpen(false);
                                }}
                                images={[{src: posterurl, alt: title}]}
                            />
                        )
                    }
                </>
            );
            break;
        case "ERROR_LOADING":
            el = (
                <Alert variant="danger my-3">
                    {error?.message}
                </Alert>
            );
            break;
    }

    return el;
}

export default MovieDetails;
