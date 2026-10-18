import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ images, handleImageClick }) => {
    return (
        <ul className={css.gallery}>
            {images.map(image => <ImageGalleryItem key={image.id} image={image} handleImageClick={handleImageClick} />)}
        </ul>
    )
}