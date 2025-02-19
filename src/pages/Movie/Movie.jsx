import { useState, useEffect, useCallback } from 'react';
import SearchForm from '../../components/UI/SearchForm/SearchForm';
import MovieCard from '../../components/Movie/MovieCard/MovieCard.jsx';
import Loading from '../../components/UI/Loading/Loading.jsx';
import { fetchMovies, ENDPOINTS, BASE_URL } from '../../services/api';

function Movie({ onAddToFavorites, favoriteMovies }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ useCallback bağımlılık dizisi eklendi!
    const fetchPopularMovies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES);
            setMovies(data.results);
        } catch (err) {
            console.error("Error fetching popular movies:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [BASE_URL, ENDPOINTS.POPULAR_MOVIES]); // ✅ Artık her render'da yeni fonksiyon oluşmayacak!

    useEffect(() => {
        fetchPopularMovies();
    }, [fetchPopularMovies]); // ✅ Sonsuz döngü engellendi!

    const handleMoviesReceived = (moviesData, isLoading, errorData) => {
        setMovies(moviesData);
        setLoading(isLoading);
        setError(errorData);
    };

    return (
        <div>
            <SearchForm onMoviesReceived={handleMoviesReceived} />
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : movies.length > 0 ? (
                <MovieCard
                    onAddToFavorites={onAddToFavorites}
                    favoriteMovies={favoriteMovies}
                    movies={movies}
                />
            ) : null} {/* Filmler yoksa veya hata varsa hiçbir şey gösterme */}
        </div>
    );
}

export default Movie;
