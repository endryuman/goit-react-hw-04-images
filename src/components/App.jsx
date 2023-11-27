import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { InfinitySpin } from 'react-loader-spinner';
import * as ImageService from '../services/imagesApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadMore } from './LoadMore/LoadMore';
import { Modal } from './Modal/Modal';
import styles from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query) {
      const getImage = async () => {
        setLoading(true);
        setLoadMore(false);
        try {
          const dataImage = await ImageService.getImage(query, page);
          if (dataImage.hits.length === 0) {
            toast.error('No images found!');
            return;
          }
          const { hits, totalHits } = dataImage;
          setImages(prev => (prev ? [...prev, ...hits] : hits));
          setLoadMore(page < Math.ceil(totalHits / 12) ? true : false);
        } catch (error) {
          setImages(null);
          toast.error('Oops! Something went wrong!');
        } finally {
          setLoading(false);
        }
      };
      getImage();
    }
  }, [query, page]);

  const addValue = value => {
    if (value !== query) {
      setQuery(value);
      setImages(null);
      setPage(1);
      setLoadMore(false);
      setShowModal(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = selectedImage => {
    setShowModal(showModal => !showModal);
    setSelectedImage(selectedImage);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={addValue} />
      {images && <ImageGallery images={images} onClick={toggleModal} />}
      {loading && <InfinitySpin width="200" color="blue" />}
      {loadMore && <LoadMore onClick={handleLoadMore} />}
      {showModal && <Modal onClose={toggleModal} ImageUrl={selectedImage} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
