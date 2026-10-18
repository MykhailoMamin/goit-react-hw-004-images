import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ image, handleImageClick }) => {
    return (
        <li className={css.item}>
            <img className={css.image} src={image.webformatURL} alt={image.tags} onClick={() => handleImageClick(image)} />
        </li>
     )
}