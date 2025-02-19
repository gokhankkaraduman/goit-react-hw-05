import Lottie from "lottie-react";
import notFound from "../../../assets/lottiefiles/SearchAnimation.json";
import css from "./NotFoundSearch.module.css";

function NotFoundSearch (){
    return (
        <div className={css.container}>
            <h2 className={css.title}>We're sorry, we couldn't find any results matching your search.</h2>
            <Lottie animationData={notFound} loop={true}  className={css.animation}/>
        </div>
    )
};

export default NotFoundSearch;