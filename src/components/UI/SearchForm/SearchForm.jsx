import { Formik, Field, Form } from "formik";
import { useSearchParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { fetchMovies, ENDPOINTS, BASE_URL, IMG_BASE_URL } from "../../../services/api";
import css from './SearchForm.module.css';
import Loading from '../Loading/Loading.jsx'
import NotFoundSearch from "../../UI/NotFoundSearch/NotFoundSearch.jsx";
import { MdClear } from "react-icons/md";

function SearchForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialQuery = searchParams.get("query") || "";
    const [query, setQuery] = useState(initialQuery);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await fetchMovies(BASE_URL, ENDPOINTS.GENRE_LIST);
                setGenres(data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const handleFetch = async (query, page) => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchMovies(BASE_URL, ENDPOINTS.SEARCH_MOVIES, { query, page });
                if (data && data.results && Array.isArray(data.results)) {
                    setTotalPages(data.total_pages);
                    setMovies(data.results);
                } else {
                    setMovies([]);
                }
            } catch (err) {
                console.error("Error fetching movies:", err);
                setMovies([]);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            handleFetch(query, page);
        } else {
            setMovies([]);
        }
    }, [query, page]);

    useEffect(() => {
        setPage(Number(searchParams.get("page")) || 1);
    }, [searchParams]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber)
            setSearchParams({ query, page: pageNumber });
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const visiblePages = 3;

        if (totalPages <= visiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`${css.paginationButton} ${page === i ? css.active : ""}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`${css.paginationButton} ${page === 1 ? css.active : ""}`}
                >
                    1
                </button>
            );

            if (page > visiblePages / 2 + 1) {
                buttons.push(<span className={css.span} key="start-ellipsis">...</span>);
            }

            const startPage = Math.max(2, page - Math.floor(visiblePages / 2));
            const endPage = Math.min(totalPages - 1, page + Math.floor(visiblePages / 2));

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`${css.paginationButton} ${page === i ? css.active : ""}`}
                    >
                        {i}
                    </button>
                );
            }

            if (page < totalPages - visiblePages / 2) {
                buttons.push(<span key="end-ellipsis">...</span>);
            }

            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`${css.paginationButton} ${page === totalPages ? css.active : ""}`}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    const handleClear = (setFieldValue) => {
        setQuery("");
        setSearchParams({});
        setMovies([]);
        setFieldValue("search", "");
        navigate("/");
    };

    return (
        <>
            <section className={css.searchSection}>
                <Formik
                    initialValues={{ search: initialQuery }}
                    onSubmit={(values, { setSubmitting }) => {
                        const trimmedSearch = values.search.trim();
                        setQuery(trimmedSearch);
                        setSearchParams({ query: trimmedSearch, page: 1 });
                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form className={css.searchFormContainer}>
                            <Field
                                type="text"
                                name="search"
                                placeholder="Search"
                                value={values.search}
                                onChange={handleChange}
                                className={css.searchFormInput}
                            />
                            <button type="submit" className={css.searchFormButton}>
                                Search
                            </button>
                            <button
                                type="button"
                                className={css.clearButton}
                                onClick={() => handleClear(setFieldValue)}
                                style={{ display: query ? 'block' : 'none' }}
                            >
                                <MdClear />
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
            <section className={css.movieSection}>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div>Error: {error}</div>
                ) : query ? (
                    movies.length > 0 ? (
                        <div className={css.searchMovieContainer}>
                            <ul className={css.searchMovieList}>
                                {movies.map((movie) => {
                                    const date = movie.release_date ? movie.release_date.split("-")[0] : "Unknown";
                                    const rate = movie.vote_average ? Number(movie.vote_average).toFixed(1) : "Unknown";
                                    const genreNames = movie.genre_ids && genres.length > 0 && movie.genre_ids[0] ? (genres.find(g => g.id === movie.genre_ids[0])?.name || "Unknown") : "Unknown";

                                    return (
                                        <li key={movie.id} className={css.searchMovieItem}>
                                            <Link to={`/movies/${movie.id}`}>
                                                <div className={css.searchMoviePoster}>
                                                    <img
                                                        src={`${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.poster_path}`}
                                                        alt={movie.title}
                                                        className={css.searchMovieImg}
                                                    />
                                                </div>
                                                <div className={css.searchMovieInfo}>
                                                    <h3 className={css.searchMovieTitle}>{movie.title}</h3>
                                                </div>
                                                <div className={css.searchMovieDetails}>
                                                    <p className={css.searchMovieDate}>Date: {date}</p>
                                                    <p className={css.searchMovieRate}>Rate: {rate}</p>
                                                    <p className={css.searchMovieGenre}>Genre: {genreNames}</p>
                                                    <p className={css.searchMovieLang}>Lang: {movie.original_language}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        <NotFoundSearch />
                    )
                ) : null}

                {totalPages > 1 && query && (
                    <div className={css.paginationContainer}>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={css.paginationButton}
                        >
                            Prev
                        </button>

                        {renderPaginationButtons()}

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className={css.paginationButton}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}

export default SearchForm;
