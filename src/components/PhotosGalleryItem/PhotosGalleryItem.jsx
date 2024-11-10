import { GridItem } from "..";
import s from "./PhotosGalleryItem.module.css";

export const PhotosGalleryItem = ({ alt, avg_color, src }) => {
  return (
    <GridItem>
      <div
        style={{ backgroundColor: avg_color, borderColor: avg_color }}
        className={s.thumb}
      >
        <img src={src.large} alt={alt} />
      </div>
    </GridItem>
  );
};
