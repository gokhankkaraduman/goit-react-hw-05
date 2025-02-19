import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { ENDPOINTS, fetchMovies, BASE_URL, IMG_BASE_URL } from '../../../services/api.js';
import css from './Carousel.module.css';

function Carousel() {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // Aktif film indexi

    useEffect(() => {
        const fetchDataMovies = async () => {
            const data = await fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES);
            const movies = data.results;
            setMovies(movies);
        };
        fetchDataMovies();

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = prevIndex === movies.length - 1 ? 0 : prevIndex + 1;
                return nextIndex;
            });
        }, 8000);

        return () => clearInterval(intervalId);

    }, [movies.length]);

    const nextMovie = () => {
        if (activeIndex < movies.length - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1); 
        }
    };

    const prevMovie = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1); 
        }
    };

    return (
        <section className={css.hero_section}>
            <div className={css.hero_container}>
                <h2 className={css.hero_title}>Popular Movies</h2>
                <div className={css.carousel}>
                    <ul
                        className={css.carousel_list}
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)` // Aktif filme göre kaydırma
                        }}
                    >
                        {movies.map((movie) => (
                            <li className={css.carousel_item} key={movie.id}>
                                <div className={css.img_wrapper}>
                                    <NavLink to={`/movies/${movie.id}`} className={css.img_link}>
                                        <img
                                            src={`${IMG_BASE_URL}/${ENDPOINTS.IMG_W780}/${movie.poster_path}`}
                                            alt={movie.title}
                                            className={css.img}
                                        />
                                    </NavLink>
                                </div>
                                <div className={css.info_wrapper}>
                                    <h3 className={css.info_title}>{movie.title}</h3>
                                    <p className={css.info_overview}>{movie.overview}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button 
                        className={`${css.carousel_button} ${css.prev_button}`} 
                        onClick={prevMovie}
                    >
                        &lt;
                    </button>
                    <button 
                        className={`${css.carousel_button} ${css.next_button}`} 
                        onClick={nextMovie}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Carousel;
