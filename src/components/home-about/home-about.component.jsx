import css from "./home-about.module.css";

const HomeAbout = () => {
  return (
    <div className={css["home-about-container"] + " section"}>
      <h1 className="section-title">About Nouveau</h1>

      <blockquote className={css["home-about-quote"]}>
        <p>
          We believe in the transformative power of self-love. Our mission is to inspire and empower individuals to embrace their bodies with{" "}
          <span className="em">gratitude</span> and{" "}
          <span className="em">care</span>. Your body is a{" "}
          <span className="em">sacred vessel</span>—worthy of{" "}
          <span className="em">love</span>,{" "}
          <span className="em">nourishment</span>, and{" "}
          <span className="em">reverence</span>.
        </p>
      </blockquote>
    </div>
  );
};

export default HomeAbout;
