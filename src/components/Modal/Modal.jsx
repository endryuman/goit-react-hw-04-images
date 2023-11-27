import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      props.onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  };

  return createPortal(
    <div className={styles.Backdrop} onClick={handleBackdropClick}>
      <div className={styles.Content}>
        <img src={props.ImageUrl} alt="Modal" width={800} height={600} />
      </div>
    </div>,
    modalRoot
  );
};
