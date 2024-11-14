import { Grid, PhotosGalleryItem } from "..";

export const PhotosGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ alt, avg_color, id, src }) => (
        <PhotosGalleryItem
          key={id}
          alt={alt}
          avg_color={avg_color}
          src={src}
          openModal={openModal}
        />
      ))}
    </Grid>
  );
};
