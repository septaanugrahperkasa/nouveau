import { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";

import css from "./home-instagram.module.css";

const HomeInstagram = () => {
  return (
    <div className={"page-container"}>
      <div className={css["home-instagram-heading"]}>
        <h2 className={`${css["title"]} section-title`}>Crafted for You</h2>
        <span className={css["subheading"]}>Find us on @nouveau</span>
      </div>
      <div className={css["instagram-grid"]}>
        <InstagramEmbed
          placeholderSpinnerDisabled
          url="https://www.instagram.com/p/DH3pTIRSmzi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          width={328}
        />
        <InstagramEmbed
          placeholderSpinnerDisabled
          url="https://www.instagram.com/p/DIR0X7aT1Yh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          width={328}
        />
      </div>
    </div>
  );
};

export default HomeInstagram;
