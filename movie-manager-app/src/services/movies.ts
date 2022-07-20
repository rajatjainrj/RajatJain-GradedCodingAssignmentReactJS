import axios from "axios";
import IMovie from "../models/IMovie";

const getMoviesInTheaters = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/movies-in-theaters`)
        .then(response => response.data);
}

const getComingSoon = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/movies-coming`)
        .then(response => response.data);
}

const getTopRatedIndia = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/top-rated-india`)
        .then(response => response.data);
}

const getTopRatedMovies = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/top-rated-movies`)
        .then(response => response.data);
}

const getFavourites = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/favourit`)
        .then(response => response.data);
}

const addToFavourites = (movieData : IMovie) => {
    return axios.post<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/favourit`, movieData)
        .then(response => response.data);
}

export {
    getMoviesInTheaters,
    getFavourites,
    getTopRatedMovies,
    getTopRatedIndia,
    addToFavourites,
    getComingSoon
}
