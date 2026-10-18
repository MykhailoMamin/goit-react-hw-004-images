import { Component } from "react"
import css from "./Modal.module.css";

export class Modal extends Component {


  handleKeyDown = evt => {
    if (evt.key === "Escape") {
      this.props.onClose()
    } 
  }

  componentDidMount() {
      window.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown)
  }

  render() {
    const { onClose, largeImageURL, tags } = this.props;
    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal}>
                <img className={css.image} src={largeImageURL} alt={tags} onClick={evt => evt.stopPropagation()}></img>
            </div>
        </div>)
    }
}