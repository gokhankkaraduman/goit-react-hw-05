import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import { fetchMovies, ENDPOINTS, BASE_URL, IMG_BASE_URL } from '../../../services/api.js';
import Loading from '../../UI/Loading/Loading.jsx';
import css from './MovieCard.module.css';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function MovieCard({ onAddToFavorites, favoriteMovies, movies = [] }) {  
    const [genres, setGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            setLoadingGenres(true);
            try {
                const data = await fetchMovies(BASE_URL, ENDPOINTS.GENRE_LIST);
                setGenres(data.genres);
            } catch (err) {
                setError(err);
                console.error("Error fetching genres:", err);
            } finally {
                setLoadingGenres(false);
            }
        };

        fetchGenres();
    }, []); // 🔥 Sonsuz döngüyü önlemek için bağımlılık dizisi boş bırakıldı

    // ✅ Gereksiz render'ları önlemek için useMemo kullanıldı
    const memoizedMovies = useMemo(() => movies, [movies]);

    if (loadingGenres) {  
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={css.movie_section}>
            <div className={css.movie_container}>
                <h2 className={css.title}>Popular Movies</h2>
                <ul className={css.movie_list}>
                    {memoizedMovies.map((movie) => {
                        const date = movie.release_date ? movie.release_date.split("-")[0] : "Unknown";
                        const rate = movie.vote_average ? Number(movie.vote_average).toFixed(1) : "Unknown";
                        const genreNames = genres.find(g => g.id === movie.genre_ids[0])?.name || "Unknown";
                        const isFavorite = favoriteMovies.includes(movie.id.toString());

                        return (
                            <li key={movie.id} className={css.movie_item}>
                                <Link to={`/movies/${movie.id}`} key={movie.id}>
                                    <div className={css.movie_poster}>
                                        <img
                                            src={`${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </div>
                                    <div className={css.movie_info}>
                                        <h3 className={css.movie_title}>{movie.title}</h3>
                                    </div>
                                    <div className={css.movie_details}>
                                        <div>
                                            <div className={css.detail_group}>
                                                <span className={css.movie_date}><strong>Date:</strong> {date}</span>
                                            </div>
                                            <div className={css.detail_group}>
                                                <span className={css.movie_rate}><strong>Rate:</strong> {rate}</span>
                                            </div>
                                            <div className={css.detail_group}>
                                                <span className={css.movie_genre}><strong>Genre:</strong> {genreNames}</span>
                                            </div>
                                            <div className={css.detail_group}>
                                                <span className={css.movie_lang}><strong>Lang:</strong> {movie.original_language}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <button className={css.favoriteButton} onClick={() => onAddToFavorites(movie.id)}>
                                    {isFavorite ? <MdFavorite className={css.favoriteIcon + ' active'} /> : <MdFavoriteBorder className={css.favoriteIcon} />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default MovieCard;
