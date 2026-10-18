import { ThreeDots } from 'react-loader-spinner'
import css from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={css.loader}>
            <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#3f51b5"
            radius="9"
            ariaLabel="three-dots-loading"
            />
        </div>
    )
}