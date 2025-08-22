import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/helpers/navigate";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import css from "./home-hero.module.css";

const HomeHero = () => {
  const navigate = useNavigate();
  const handleNavigate = navigateTo(navigate);

  return (
    <div className={css["home-hero-container"]}>
      <div className={css["home-hero-details"]}>
        <span className={css["home-hero-subtitle"]}>Nourish & Glow</span>

        <h1 className={css["home-hero-title"]}>
        Unlock Nature’s Purest Touch for Radiant Skin
        </h1>
      </div>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.accented}
        className={css["accented-link"]}
        onClick={() => handleNavigate("/shop")}
      >
        Explore Collection
      </Button>
    </div>
  );
};

export default HomeHero;