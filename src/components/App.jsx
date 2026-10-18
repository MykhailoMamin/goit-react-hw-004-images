import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { getImages } from "../services/pixabay-api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    searchValue: "",
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    selectedImage: null,
    hasMore: true,
    totalHits: 0,
  };

  handleGetImages = async (searchValue) => {
    this.setState({
      images: [],
      isLoading: true,
      error: null,
      page: 1,
      hasMore: true,
      totalHits: 0,
    });

    try {
      const data = await getImages(searchValue);

      this.setState({
        images: data.hits,
        totalHits: data.totalHits,
        hasMore: data.hits.length < data.totalHits,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async (searchValue) => {
    const nextPage = this.state.page + 1;

    this.setState({
      isLoading: true,
      error: null,
    });

    try {
      const data = await getImages(searchValue, nextPage);

      this.setState((prevState) => {
        const images = [...prevState.images, ...data.hits];

        return {
          images,
          page: nextPage,
          hasMore: images.length < data.totalHits,
        };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (value) => {
    this.setState({
      searchValue: value,
    });

    this.handleGetImages(value);
  };

  handleImageClick = (selectedImage) => {
    this.setState({ selectedImage });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const {
      images,
      isLoading,
      hasMore,
      searchValue,
      selectedImage,
      error,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {images.length > 0 && (
          <ImageGallery
            images={images}
            handleImageClick={this.handleImageClick}
          />
        )}

        {images.length > 0 && hasMore && (
          <Button
            loading={isLoading}
            onClick={() => this.handleLoadMore(searchValue)}
          />
        )}

        {selectedImage && (
          <Modal
            largeImageURL={selectedImage.largeImageURL}
            tags={selectedImage.tags}
            onClose={this.handleModalClose}
          />
        )}

        {isLoading && <Loader />}
        {error && Notify.failure('Something went wrong. Please try again.')}
        {searchValue && images.length === 0 && !isLoading && error === null && Notify.info("No images found. Try another search.")}
      </>
    );
  }
}