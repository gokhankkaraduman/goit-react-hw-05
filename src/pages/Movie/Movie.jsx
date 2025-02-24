import { useState, useEffect, useCallback } from 'react';
import SearchForm from '../../components/UI/SearchForm/SearchForm';
import MovieCard from '../../components/Movie/MovieCard/MovieCard.jsx';
import Loading from '../../components/UI/Loading/Loading.jsx';
import { fetchMovies, ENDPOINTS, BASE_URL } from '../../services/api';

function Movie({ onAddToFavorites, favoriteMovies }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    // Popüler filmleri çekmek için useCallback ile tanımlı fonksiyon
    const fetchPopularMovies = useCallback(async () => {
        setLoading(true);
        setError(null);
        setQuery("");
        try {
            const data = await fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES);
            setMovies(data.results);
        } catch (err) {
            console.error("Error fetching popular movies:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [BASE_URL, ENDPOINTS.POPULAR_MOVIES]);

    // İlk yüklemede popüler filmleri çek
    useEffect(() => {
        fetchPopularMovies();
    }, [fetchPopularMovies]);

    // handleMoviesReceived'ı useCallback ile memoize et
    const handleMoviesReceived = useCallback((moviesData, isLoading, errorData, receivedQuery) => {
        setMovies(moviesData);
        setLoading(isLoading);
        setError(errorData);
        setQuery(receivedQuery);
        // Eğer query boşsa, popüler filmleri tekrar çek
        if (!receivedQuery) {
            fetchPopularMovies();
        }
    }, [fetchPopularMovies]);

    return (
        <div>
            <SearchForm onMoviesReceived={handleMoviesReceived} />
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : movies.length > 0 && !query ? (
                <MovieCard
                    onAddToFavorites={onAddToFavorites}
                    favoriteMovies={favoriteMovies}
                    movies={movies}
                />
            ) : null}
        </div>
    );
}

export default Movie;