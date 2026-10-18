import { Component } from "react";
import css from "./Searchbar.module.css";

export class Searchbar extends Component {
    state = {
        value: "",
    }

    handleChange = evt => {
        this.setState({
            value: evt.target.value,
        })
    }

    handleSubmit = evt => {
        evt.preventDefault();
        const value = this.state.value;
        const { onSubmit } = this.props;
        
        if (value.trim() === "") {
            return;
        }
        onSubmit(value.trim())
        this.setState({
            value: '',
        })
    }
    
    render() {
    return (
        <header className={css.header}>
        <form
            className={css.form}
            onSubmit={this.handleSubmit}
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
            onChange={this.handleChange}
            value={this.state.value}
            />
        </form>
        </header>
    );
    }
}