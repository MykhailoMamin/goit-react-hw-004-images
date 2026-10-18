import css from "./Button.module.css";

export const Button = ({ onClick, loading }) => {
    return (
        <button className={css.button} type="button" onClick={onClick} disabled={loading}>Load more</button>
    )
}