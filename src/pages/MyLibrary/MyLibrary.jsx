import React, { useState, useEffect } from 'react';
import { IMG_BASE_URL, ENDPOINTS, BASE_URL, fetchMovies } from '../../services/api.js';
import css from './MyLibrary.module.css';
import Loading from '../../components/UI/Loading/Loading.jsx';

function MyLibrary({ favoriteMovies: favoriteMovieIds, loading: allMoviesLoading, onRemoveFromFavorites }) {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (favoriteMovieIds.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const moviePromises = favoriteMovieIds.map(async (movieId) => {
                    const movieData = await fetchMovies(BASE_URL, `${ENDPOINTS.MOVIE_DETAILS(movieId)}`);
                    return movieData;
                });

                const movies = await Promise.all(moviePromises);
                setFavoriteMovies(movies);
            } catch (error) {
                console.error("Error fetching favorite movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteMovies();
    }, [favoriteMovieIds]);

    if (allMoviesLoading || loading) {
        return <Loading />;
    }

    return (
        <section className={css.section}>
            <div className={css.myLibraryContainer}>
                <h2 className={css.myLibraryTitle}>My Library</h2>
                <div className={css.movieGrid}>
                    {favoriteMovies.map((movie) => (
                        <div key={movie.id} className={css.movieCard}> {/* movieCard class'ını kullandık */}
                            <div className={css.moviePoster}>
                                <img
                                    src={`${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </div>
                            <div className={css.movieInfo}>
                                <h3 className={css.movieTitle}>{movie.title}</h3>
                                <button className={css.removeButton} onClick={() => onRemoveFromFavorites(movie.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    {favoriteMovies.length === 0 && <p>Your library is empty.</p>}
                </div>
            </div>
        </section>
    );
}

export default MyLibrary;