import { useState } from "react";
import { getImages } from "../services/pixabay-api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
    const [searchValue, setSearchValue] = useState("");
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetImages = async searchValue => {
        setImages([]);
        setIsLoading(true);
        setError(null);
        setPage(1);
        setHasMore(true);

        try {
            const data = await getImages(searchValue)
            setImages(data.hits);
            setHasMore(data.hits.length < data.totalHits);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoadMore = async searchValue => {
        const nextPage = page + 1;
        setIsLoading(true)
        setError(null);

        try {
            const data = await getImages(searchValue, nextPage);
            setImages(prev => {
                const images = [...prev, ...data.hits];
                setHasMore(images.length < data.totalHits);
                return images;
            }); 
            setPage(nextPage);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearchSubmit = value => {
        setSearchValue(value);
        handleGetImages(value);
    }

    const handleImageClick = selectedImage => {
        setSelectedImage(selectedImage);
    }

    const handleModalClose = () => {
        setSelectedImage(null);
    }

    return (
        <>
            <Searchbar onSubmit={handleSearchSubmit} />
            {images.length > 0 && (
                <ImageGallery
                    images={images}
                    handleImageClick={handleImageClick}
                />
            )}
            {images.length > 0 && hasMore && (
                <Button
                    loading={isLoading}
                    onClick={() => handleLoadMore(searchValue)}
                />
            )}
            {selectedImage && (
                <Modal
                    largeImageURL={selectedImage.largeImageURL}
                    tags={selectedImage.tags}
                    onClose={handleModalClose}
                />
            )}
            {isLoading && <Loader />}
            {error && Notify.failure('Something went wrong. Please try again.')}
            {searchValue && images.length === 0 && !isLoading && error === null && Notify.info("No images found. Try another search.")}
        </>
    )
}