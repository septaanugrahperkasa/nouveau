import InnerImageZoom from "react-inner-image-zoom";
import { CategoryItem } from "../../store/category/category.types";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import css from "./product-side-images.module.css";

type ProductSideImagesProps = {
  product?: CategoryItem;
};

const ProductSideImages = ({ product }: ProductSideImagesProps) => {
  if (!product || !product.gallery || product.gallery.length === 0) {
    return null;
  }

  return (
    <div className={css["gallery-container"]}>
      {product.gallery.map((source, i) => {
        // Check if the source is a video (mp4 format)
        const isVideo = source.toLowerCase().endsWith('.mp4');
        
        return isVideo ? (
          // Render video for mp4 links with autoplay and loop, without muting
          <div className={css["video-wrapper"]} key={i}>
            <video 
              className={css["gallery-video"]}
              controls
              autoPlay
              loop
              playsInline
              src={source}
            />
          </div>
        ) : (
          // Render image for non-video links
          <InnerImageZoom
            className={css["gallery-image"]}
            key={i}
            src={source}
            imgAttributes={{ alt: `${product.name} image ${i}` }}
          />
        );
      })}
    </div>
  );
};

export default ProductSideImages;