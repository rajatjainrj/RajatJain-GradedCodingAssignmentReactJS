export default interface IMovie {
    id?: string,
    title: string,
    year: string,
    genres: string[],
    ratings: number[],
    contentRating: string,
    duration: string,
    actors: string[],
    releaseDate: string,
    storyline: string,
    imdbRating: number,
    posterurl: string,
}
