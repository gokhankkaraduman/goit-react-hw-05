import CircleLoader  from "react-spinners/CircleLoader"
import css from './Loading.module.css'

function Loading (){
    return (
        <div className={css.container}>
            <CircleLoader
                color="#2179f6"
                cssOverride={{}}
                size={85}
            />
        </div>
    );
}
export default Loading;