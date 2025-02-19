import { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '../../hooks/ThemeContext.jsx';
import Header from '../Layout/Header/Header.jsx';
import Carousel from '../UI/Carousel/Carousel.jsx';
import Footer from '../Layout/Footer/Footer.jsx';
import { Routes, Route } from 'react-router'; 
import { IMG_BASE_URL, ENDPOINTS, BASE_URL, fetchMovies } from '../../services/api.js';

const Home = lazy(() => import('../../pages/Home/Home.jsx'));
const Movie = lazy(() => import('../../pages/Movie/Movie.jsx'));
const MovieId = lazy(() => import('../Layout/MovieId/MovieId.jsx'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound.jsx'));
const MovieCast = lazy(() => import('../../pages/Movie/MovieCast/MovieCast.jsx'));
const MovieReview = lazy(() => import('../../pages/Movie/MovieReview/MovieReview.jsx'));
const Loading = lazy(() => import('../UI/Loading/Loading.jsx'));
const MyLibrary = lazy(() => import('../../pages/MyLibrary/MyLibrary.jsx'));

function App() {
  const [favoriteMovies, setFavoriteMovies] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [allMovies, setAllMovies] = useState([]);
  const [loadingAllMovies, setLoadingAllMovies] = useState(true);

  // favoriteMovies state'ini güncellediğinde localStorage'ı da güncelle
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteMovies)); // favoriteMovies değiştiğinde local storage'ı güncelle
  }, [favoriteMovies]);

  // Tüm filmleri çekiyoruz
  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoadingAllMovies(true);
      try {
        const data = await fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES);
        setAllMovies(data.results);
      } catch (error) {
        console.error("Error fetching all movies:", error);
      } finally {
        setLoadingAllMovies(false);
      }
    };

    fetchAllMovies();
  }, []);

  // Favoriye ekleme ve silme işlemleri
  const handleAddToFavorites = (movieId) => {
    const movieIdString = movieId.toString();

    setFavoriteMovies(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.includes(movieIdString);

      let updatedFavorites;
      if (isCurrentlyFavorite) {
        // Film zaten favorilerde, çıkarıyoruz
        updatedFavorites = prevFavorites.filter(id => id !== movieIdString);
      } else {
        // Film favorilere ekleniyor
        updatedFavorites = [...prevFavorites, movieIdString];
      }

      // `localStorage`'ı güncelle
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  // Favoriden silme işlemi
  const handleRemoveFromFavorites = (movieId) => {
    const movieIdString = movieId.toString();

    setFavoriteMovies(prevFavorites => {
      const updatedFavorites = prevFavorites.filter(id => id !== movieIdString);

      // `localStorage`'ı güncelle
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  return (
    <ThemeProvider>
      <>
        <Header />
        <Carousel />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home
              movies={allMovies}
              loading={loadingAllMovies}
              onAddToFavorites={handleAddToFavorites}
              favoriteMovies={favoriteMovies}
            />} />

            <Route path="/library" element={<MyLibrary
              favoriteMovies={favoriteMovies}
              loading={loadingAllMovies} 
              onRemoveFromFavorites={handleRemoveFromFavorites} 
            />} />
            <Route path="/movies/:id" element={<MovieId onAddToFavorites={handleAddToFavorites} favoriteMovies={favoriteMovies} />} />
            <Route path="/movies" element={<Movie movies={allMovies} loading={loadingAllMovies} onAddToFavorites={handleAddToFavorites} favoriteMovies={favoriteMovies} />} />
            <Route path="/movies/:id/cast" element={<MovieCast onAddToFavorites={handleAddToFavorites} favoriteMovies={favoriteMovies} />} />
            <Route path="/movies/:id/reviews" element={<MovieReview onAddToFavorites={handleAddToFavorites} favoriteMovies={favoriteMovies} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;
