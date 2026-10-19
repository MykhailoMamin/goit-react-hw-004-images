import { useState } from "react";
import css from "./Searchbar.module.css";

export const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState("");

    const handleChange = evt => {
        setValue(evt.target.value);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (value.trim() === "") {
            return;
        }
        onSubmit(value.trim());
        setValue('');
    }

    return (
        <header className={css.header}>
        <form
            className={css.form}
            onSubmit={handleSubmit}
        >
            <button className={css.button} type="submit">
            <span>Search</span>
            </button>

            <input
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
            />
        </form>
        </header>
    )
}