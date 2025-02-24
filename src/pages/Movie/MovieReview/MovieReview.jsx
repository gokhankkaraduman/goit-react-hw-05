import { useOutletContext } from "react-router";
import css from './MovieReview.module.css'
import { IMG_BASE_URL } from '../../../services/api.js'

function MovieReview() {
    const { reviews } = useOutletContext(); 
    console.log(reviews); // reviews'u burada kontrol edebilirsiniz

    return (
        <section className={css.reviewSection}>
            <div className={css.container}>
                <h2 className={css.reviewTitle}>Reviews</h2>
                <ul className={css.reviewsList}>
                    {reviews.map((review) => {
                        console.log(review.author_details); // review.author_details'i burada kontrol edebilirsiniz
                        return (
                            <li key={review.id} className={css.reviewItem}>
                                <img src={`${IMG_BASE_URL}/w500${review.author_details?.avatar_path}`} alt="Avatar" />
                                <h3 className={css.reviewAuthor}>{review.author}</h3>
                                <p className={css.content}>{review.content}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default MovieReview;
