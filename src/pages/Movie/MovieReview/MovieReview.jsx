import { useOutletContext } from "react-router";
import css from './MovieReview.module.css'
function MovieReview() {
    const { reviews } = useOutletContext(); 

    return (
        <section className={css.reviewSection}>
            <div className={css.container}>
                <h2 className={css.reviewTitle}>Reviews</h2>
                <ul className={css.reviewsList}>
                {reviews.map(review => (
                    <li key={review.id} className={css.reviewItem}>
                        <h3 className={css.reviewAuthor}>{review.author}</h3>
                        <p className={css.content}>{review.content}</p>
                    </li>
                ))}
                </ul>
            </div>
        </section>
    );
}

export default MovieReview;
