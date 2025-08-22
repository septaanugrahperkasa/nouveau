import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/helpers/navigate";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

import css from "./footer.module.css";

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigate = navigateTo(navigate);

  return (
    <div className={`${"section"} ${css["footer"]}`}>
      <h4 className={css["footer-title"]}>YOUR BODY, YOUR SANCTUARY</h4>

      <div className={css["socials"]}>
        <InstagramIcon className={css["nav-social"]} />
        <FacebookIcon className={css["nav-social"]} />
        <PinterestIcon className={css["nav-social"]} />
      </div>

      <div className={css["footer-navigation"]}>
        <div className={css["footer-navigation-info"]}>
          <h5 className={css["subtitles"]}>Explore</h5>
          <span
            className={css["nav-item"]}
            onClick={() => handleNavigate("/shop")}
          >
            Shop
          </span>
          <span
            className={css["nav-item"]}
            onClick={() => handleNavigate("/blog")}
          >
            Blog
          </span>
          <span
            className={css["nav-item"]}
            onClick={() => handleNavigate("/wishlist")}
          >
            My Wishlist
          </span>
          <span
            className={css["nav-item"]}
            onClick={() => handleNavigate("/account")}
          >
            My Account
          </span>
        </div>

        <div className={css["footer-navigation-support"]}>
          <h5 className={css["subtitles"]}>About Nouveau</h5>
          <span
            className={css["nav-item"]}
            onClick={() => handleNavigate("/about")}
          >
            Our Story
          </span>
          <span
            onClick={() => handleNavigate("/shipping-returns")}
            className={css["nav-item"]}
          >
            Returns & Shipping
          </span>
          <span
            onClick={() => handleNavigate("/privacy-policy")}
            className={css["nav-item"]}
          >
            Privacy Policy
          </span>
          <span
            onClick={() => handleNavigate("/terms-of-service")}
            className={css["nav-item"]}
          >
            Terms of Service
          </span>
          <span className={css["nav-item"]} onClick={() => handleNavigate("/faq")}>
            FAQ
          </span>
          <span
            onClick={() => handleNavigate("/contact-us")}
            className={css["nav-item"]}
          >
            Contact Us
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
