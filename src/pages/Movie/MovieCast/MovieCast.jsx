import { useOutletContext } from "react-router";
import css from './MovieCast.module.css';

function MovieCast() {
    const { cast } = useOutletContext();
    console.log(cast);
    return (
        <section className={css.castSection}>
            <div className={css.container}>
                <h2 className={css.title}>Cast</h2>
                <hr />
                <ul className={css.castList}>
                    {cast.length > 0 ? (
                        cast.map((actor) => (
                            <li className={css.castItem}key={actor.id}>
                                <h5 className={css.castTitle}>
                                {actor.character} : {actor.original_name}
                                </h5>
                                <img className={css.castImg} src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.original_name} />
                            </li>
                        ))
                    ) : (
                        <li>No cast information available</li>
                    )}
                </ul>
            </div>
        </section>

    );
}

export default MovieCast;
