import { useEffect, useState } from 'react';
import MovieCard from '../../components/Movie/MovieCard/MovieCard.jsx';
import { fetchMovies, ENDPOINTS, BASE_URL } from '../../services/api.js'; 
import Loading from '../../components/UI/Loading/Loading.jsx'

function Home({ onAddToFavorites, favoriteMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true); // Yükleme başladı
      try {
        const data = await fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES); // Örnek API endpoint'i, kendi endpoint'inizi kullanın
        setMovies(data.results); // Verileri movies state'ine atıyoruz
      } catch (err) {
        setError(err);
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    fetchMoviesData();
  }, []);

  return (
    <div>
      {loading ? ( // Veriler yükleniyorsa
        <Loading /> // Loading componentini göster
      ) : error ? ( // Hata varsa
        <div>Error: {error.message}</div> // Hata mesajını göster
      ) : ( // Veriler yüklendiyse
        <MovieCard
          onAddToFavorites={onAddToFavorites}
          favoriteMovies={favoriteMovies}
          movies={movies} // movies prop'u MovieCard'a gönderiliyor
          loading={false} // loading prop'u MovieCard'a gönderiliyor (false)
        />
      )}
    </div>
  );
}

export default Home;