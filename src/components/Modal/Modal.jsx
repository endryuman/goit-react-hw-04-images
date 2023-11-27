import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = props => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

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
