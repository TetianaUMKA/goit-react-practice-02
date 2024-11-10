import { Grid, PhotosGalleryItem } from "..";

export const PhotosGallery = ({ images }) => {
  return (
    <Grid>
      {images.map(({ alt, avg_color, id, src }) => (
        <PhotosGalleryItem key={id} alt={alt} avg_color={avg_color} src={src} />
      ))}
    </Grid>
  );
};
