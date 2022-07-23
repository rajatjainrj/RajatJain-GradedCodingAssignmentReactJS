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
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/top-rated-indian`)
        .then(response => response.data);
}

const getTopRatedMovies = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/top-rated-movies`)
        .then(response => response.data);
}

const getFavourites = () => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/favourites`)
        .then(response => response.data);
}

const addToFavouritesApiCall = (movieData: IMovie) => {
    const {id, ...restObject} = movieData;
    return axios.post<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/favourites`, restObject)
        .then(response => response.data);
}

const removeFromFavouritesApiCall = (movieData: IMovie) => {
    return axios.delete<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/favourites/${movieData.id}`)
        .then(response => response.data);
}

const getMovieByTypeAndId = (type: string, id: string) => {
    return axios.get<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/${type}/${id}`)
        .then(response => response.data);
}

export {
    getMoviesInTheaters,
    getFavourites,
    getTopRatedMovies,
    getTopRatedIndia,
    addToFavouritesApiCall,
    removeFromFavouritesApiCall,
    getComingSoon,
    getMovieByTypeAndId
}
