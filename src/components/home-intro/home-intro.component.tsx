import css from "./home-intro.module.css";

const HomeIntro = () => {
  return (
    <div className={css["home-intro"]}>
      <span className="highlight">Premium Skincare, Purely Sustainable</span>
      <br />
      Nurturing <span className="em">your skin</span> & <span className="em">the planet</span> with every product.
    </div>
  );
};

export default HomeIntro;
