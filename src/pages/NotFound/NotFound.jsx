import Lottie from "lottie-react";
import notFound from "../../assets/lottiefiles/404.json";
import css from './NotFound.module.css'

function NotFound () {
    return(
        <section className={css.section}>
            <div className={css.container}>
                <Lottie animationData={notFound} loop={true}  className={css.animation}/>
            </div>
        </section>
    )
}
export default NotFound;