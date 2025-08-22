import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CategoryItem } from "../../store/category/category.types";
import css from "./product-slider.module.css";

const carouselSettings = {
  className: "center",
  centerMode: true,
  centerPadding: "60px",
  infinite: true,
  slidesToShow: 1,
  speed: 300,
  adaptiveHeight: true,
  dots: false,
};

export type ProductSliderProps = {
  product: CategoryItem | undefined;
};

const ProductSlider = ({ product }: ProductSliderProps) => {
  if (!product || !product.gallery || product.gallery.length === 0) {
    return null;
  }

  return (
    <div className={`${css["item-visual"]}`}>
      <Slider {...carouselSettings}>
        {product.gallery.map((source, i) => {
          // Check if the source is a video (mp4 format)
          const isVideo = source.toLowerCase().endsWith('.mp4');
          
          return (
            <div className={css["item-image-container"]} key={`${product.id}-${i}`}>
              {isVideo ? (
                // Render video for mp4 links with autoplay and loop
                <video 
                  className={css["item-video"]}
                  controls
                  autoPlay
                  loop
                  playsInline
                  src={source}
                />
              ) : (
                // Render image for non-video links
                <img
                  className={css["item-image"]}
                  alt={`${product.name} image ${i}`}
                  src={source}
                />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;