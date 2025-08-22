import css from "./button.module.css";
import React, { ButtonHTMLAttributes, FC } from "react";

export enum BUTTON_TYPE_CLASSES {
  basic = "basic-button",
  inverted = "inverted-button",
  accented = "accented-button",
  transparentBg = "transparent-bg-button",
  spinner = "spinner-container",
  underlinedWishlist = "underlined-wishlist-button",
  underlinedOverImage = "underlined-over-image-button",
  underlinedHome = "underlined-home-button",
  underlinedAuth = "underlined-auth",
}

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType = BUTTON_TYPE_CLASSES.basic,
  disabled,
  className,
  ...otherProps
}) => {
  const showArrow = buttonType === BUTTON_TYPE_CLASSES.underlinedHome;
  
  return (
    <button
      disabled={disabled}
      className={`${css["button-container"]} ${css[buttonType]} ${className || ""}`}
      {...otherProps}
    >
      {disabled ? (
        <div className={css["spinner"]}></div>
      ) : (
        <>
          {children}
          {showArrow && <span className={css["arrow-icon"]}>→</span>}
        </>
      )}
    </button>
  );
};

export default Button;