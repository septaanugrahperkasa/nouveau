import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import css from "./home-featured-product.module.css";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/helpers/navigate";

const HomeFeaturedProduct = () => {
  const navigate = useNavigate();
  const handleNavigate = navigateTo(navigate);
  
  return (
    <section className={css.section}>
      <div className={css.contentWrapper}>
        <h2 className={css.mainHeading}>Effective Ingredients for Visible Results</h2>
        <p className={css.featuredDescription}>
          Our curated body care products, infused with powerful active ingredients, deliver visible results, firm the skin, and leave it soft and supple.
          With fast-absorbing, non-greasy textures that rival high-end facial care, it's time to treat your body with the same level of care and luxury.
        </p>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.underlinedHome}
          onClick={() => handleNavigate("/shop/body-care")}
          className={css.discoverButton}
        >
          Discover More
        </Button>
      </div>
    </section>
  );
};

export default HomeFeaturedProduct;