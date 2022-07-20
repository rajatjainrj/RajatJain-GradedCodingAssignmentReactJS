import React from "react";
import NavigationMenu from "./NavigationMenu";
import {Route, Routes} from "react-router-dom";
import MoviesGrid from "./movie-grid/MoviesGrid";

const App = () => {
    return (
        <>
            <NavigationMenu/>
            <Routes>
                <Route path="/" element={<MoviesGrid type = "movies-in-theaters"/>}></Route>
                <Route path="/movies-in-theaters" element={<MoviesGrid type="movies-in-theaters"/>}></Route>
                <Route path="/coming-soon" element={<MoviesGrid type="coming-soon"/>}></Route>
                <Route path="/top-rated-indian" element={<MoviesGrid type="top-rated-indian"/>}></Route>
                <Route path="/top-rated-movies" element={<MoviesGrid type="top-rated-movies"/>}></Route>
                <Route path="/favourites" element={<MoviesGrid type="favourites"/>}></Route>
            </Routes>
        </>
    );
}

export default App;
