import { useEffect, useState } from 'react';
import { NavLink, useParams, Outlet, useNavigate } from 'react-router';
import { ENDPOINTS, fetchMovies, BASE_URL, IMG_BASE_URL } from '../../../services/api.js';
import Loading from '../../UI/Loading/Loading.jsx';
import css from "./MovieId.module.css";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";


function MovieId() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [load, setLoad] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoad(true);
                const movieData = await fetchMovies(BASE_URL, ENDPOINTS.MOVIE_DETAILS(id));
                setMovie(movieData);

                const videoData = await fetchMovies(BASE_URL, ENDPOINTS.MOVIE_VIDEOS(id));
                const trailer = videoData.results.find((video) => video.type === 'Trailer');
                if (trailer) {
                    setVideos(trailer.key);
                }

                const castData = await fetchMovies(BASE_URL, ENDPOINTS.MOVIE_CREDITS(id));
                setCast(castData.cast);

                const reviewData = await fetchMovies(BASE_URL, ENDPOINTS.MOVIE_REVIEWS(id));
                setReviews(reviewData.results);
                setLoad(false);

                const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                setIsFavorite(storedFavorites.some(favId => favId === id));

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const movieId = id;

        const isCurrentlyFavorite = storedFavorites.some(favId => favId === movieId);

        if (isCurrentlyFavorite) {
            const updatedFavorites = storedFavorites.filter(favId => favId !== movieId);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            storedFavorites.push(movieId);
            localStorage.setItem('favorites', JSON.stringify(storedFavorites));
            setIsFavorite(true);
        }
    };

    if (!movie || load) {
        return <Loading />;
    }

    return (
        <section className={css.movieSection} key={id}>
            <div className={css.container}>
                <div className={css.movieTitle}>
                    <h2 className={css.title}>{movie.title}</h2>
                    <div className={css.wrapper}>
                        <p className={css.vote}>IMBD: {movie.vote_average}</p>
                        <p className={css.count}>Vote Count: {movie.vote_count}</p>
                    </div>
                    <button className={css.favoriteButton} onClick={toggleFavorite}>
                        {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                    </button>
                </div>
                <div className={css.movieContainer}>
                    <div className={css.movieImage}>
                        <img className={css.image} src={`${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.poster_path}`}
                            alt={movie.title} width="100%" height="100%"
                        />
                    </div>
                    <div className={css.movieTrailer}>
                        <iframe
                            className={css.trailer}
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videos}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className={css.movieDetails}>
                    <div className={css.additionalInfo}>
                        <h3 className={css.infoTitle}>Additional Information</h3>
                        <ul className={css.infoList}>
                            <li className={css.infoItem}>
                                <NavLink className={css.navLink} to={`/movies/${id}/cast`}>Cast</NavLink>
                            </li>
                            <li className={css.infoItem}>
                                <NavLink className={css.navLink} to={`/movies/${id}/reviews`}>Reviews</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={css.overviewSection}>
                        <h3 className={css.overviewTitle}>Overview</h3>
                        <p className={css.overviewText}>
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>
            <Outlet context={{ cast:cast, reviews }} key={id} />
        </section>
    );
}

export default MovieId;