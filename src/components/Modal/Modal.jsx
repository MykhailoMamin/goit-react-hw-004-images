import { useEffect } from "react";
import css from "./Modal.module.css";

export const Modal = ({ onClose, largeImageURL, tags  }) => {      
    useEffect(() => {
      const handleKeyDown = evt => {
        if (evt.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose]);

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal}>
                <img src={largeImageURL} alt={tags} onClick={evt => evt.stopPropagation()}/>
            </div>
        </div>
    )
}