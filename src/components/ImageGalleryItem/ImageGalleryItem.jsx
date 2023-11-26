export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li>
      <img
        src={image.webformatURL}
        alt={image.tags}
        width={360}
        height={300}
        onClick={() => onClick(image.largeImageURL)}
      />
    </li>
  );
};
