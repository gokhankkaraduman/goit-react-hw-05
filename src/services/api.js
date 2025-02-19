import axios from "axios";


const API_KEY = "73d860250c4a6b26e16a2e02ab287042";
const BASE_URL = "https://api.themoviedb.org/3"; //API ANA DIZIN
const IMG_BASE_URL = "https://image.tmdb.org/t/p"; //API RESIM ANA DIZIN
export { BASE_URL, IMG_BASE_URL };

// ENDPOINT OBJECTS
export const ENDPOINTS = {
    TRENDING_WEEK: "/trending/movie/week", //API TREND FILM HAFTALIK
    TRENDING_DAY: "/trending/movie/day", //API TREND FILM GUNLUK
    POPULAR_MOVIES: "/movie/popular", //API TREND FILM
    UPCOMING_MOVIES: "/movie/upcoming", //API GET UPCOMING
    MOVIE_DETAILS: (movieId) => `/movie/${movieId}`,
    MOVIE_VIDEOS: (movieId) => `/movie/${movieId}/videos`,
    MOVIE_CREDITS: (movieId) => `/movie/${movieId}/credits`,
    MOVIE_REVIEWS: (movieId) => `/movie/${movieId}/reviews`,
    SEARCH_MOVIES: "/search/movie",
    GENRE_LIST: "/genre/movie/list",
    IMG_W500: "/w500",
    IMG_W780: "/w780",
    IMG_W1280: "/w1280",
    IMG_ORIGINAL: "/original",
};

export async function fetchMovies(baseurl, endpoint, params = {}) {
    try {
        const query = params.query ? { query: params.query } : {};
        const response = await axios.get(`${baseurl}${endpoint}`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
            ...params,
            ...query,
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
