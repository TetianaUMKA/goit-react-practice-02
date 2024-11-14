import { getPhotos } from "apiService/photos";
import { Button, Form, Loader, PhotosGallery, Text } from "components";
import { ImageModal } from "components/ImageModal/ImageModal";

import { set } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";

export const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [srcModal, setSrcModal] = useState("");
  const [altModal, setAltModal] = useState("");

  function openModal(src, alt) {
    setIsOpen(true);
    setSrcModal(src);
    setAltModal(alt);
  }

  function closeModal() {
    setIsOpen(false);
    setSrcModal("");
    setAltModal("");
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { total_results, per_page, photos } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);
  const handleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };
  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);
  return (
    <>
      <Form onSubmit={handleSubmit} />
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && !isLoading && !isEmpty && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loaging" : "Load more"}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={srcModal}
        alt={altModal}
      />
    </>
  );
};
