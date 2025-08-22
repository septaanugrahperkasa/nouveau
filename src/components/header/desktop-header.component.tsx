import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/helpers/navigate";

import CartIcon from "../cart-icon/cart-icon.component";
import Icon from "../icon/icon.component";

import styles from "./desktop-header.module.css";

import { useState, useEffect } from "react";
import classNames from "classnames";

type DropdownProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

type DropdownGroupProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

type DropdownItemProps = {
  href: string;
  label: string;
};

const DesktopHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1118) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={classNames(styles.nav, styles.container)}>
        <div className={styles.nav__data}>
          <Link className={styles["logo-link"] + " logo"} to="/">
            <Icon icon={"logo"} iconSize={5} className={styles["logo"]} />
          </Link>

          <div className={styles.nav__toggle} onClick={toggleMenu}>
            {isMenuOpen ? (
              <i className={classNames("ri-close-line", styles.nav__toggleClose)}></i>
            ) : (
              <i className={classNames("ri-menu-line", styles.nav__toggleMenu)}></i>
            )}
          </div>
        </div>

        <div className={classNames(styles.nav__menu, { [styles.nav__menuOpen]: isMenuOpen })}>
          <ul className={styles.nav__list}>
            <li>
              <a href="/shop" className={styles.nav__link}>Shop</a>
            </li>

            <Dropdown title="Skincare" isOpen={openDropdown === 1} onClick={() => toggleDropdown(1)}>
              <DropdownGroup icon="ri-drop-line" title="Face Care">
                <DropdownItem href="/shop/cleanser" label="Facial Cleansers" />
                <DropdownItem href="/shop/moisturizer" label="Moisturizers" />
                <DropdownItem href="/shop/serum" label="Serums & Treatments" />
                <DropdownItem href="/shop/sunscreen" label="Sun Protection" />
              </DropdownGroup>
              <DropdownGroup icon="ri-heart-3-line" title="Body Care">
                <DropdownItem href="/shop/body-lotion" label="Body Lotions" />
                <DropdownItem href="/shop/body-wash" label="Body Cleansers" />
                <DropdownItem href="/shop/exfoliant" label="Body Scrubs" />
              </DropdownGroup>
              <DropdownGroup icon="ri-star-line" title="Special Collections">
                <DropdownItem href="/shop/anti-aging" label="Anti-Aging" />
                <DropdownItem href="/shop/sensitive" label="Sensitive Skin" />
                <DropdownItem href="/shop/acne" label="Acne Treatment" />
              </DropdownGroup>
            </Dropdown>

            <Dropdown title="Beauty Tips" isOpen={openDropdown === 2} onClick={() => toggleDropdown(2)}>
              <DropdownGroup icon="ri-book-line" title="Skincare Guides">
                <DropdownItem href="/guides/morning-routine" label="Morning Skincare Routine" />
                <DropdownItem href="/guides/night-routine" label="Night Skincare Routine" />
                <DropdownItem href="/guides/skin-types" label="Know Your Skin Type" />
              </DropdownGroup>
              <DropdownGroup icon="ri-lightbulb-line" title="Beauty Articles">
                <DropdownItem href="/blog/ingredients" label="Skincare Ingredients Guide" />
                <DropdownItem href="/blog/seasonal-care" label="Seasonal Skincare Tips" />
              </DropdownGroup>
            </Dropdown>

            <li>
              <a href="/blog" className={styles.nav__link}>Beauty Journal</a>
            </li>

            <Dropdown title="About Us" isOpen={openDropdown === 3} onClick={() => toggleDropdown(3)}>
              <DropdownGroup icon="ri-leaf-line" title="Our Story">
                <DropdownItem href="/about" label="About Nouveau" />
                <DropdownItem href="/sustainability" label="Sustainability Promise" />
                <DropdownItem href="/ingredients" label="Natural Ingredients" />
              </DropdownGroup>
              <DropdownGroup icon="ri-customer-service-2-line" title="Customer Care">
                <DropdownItem href="/contact" label="Contact Us" />
                <DropdownItem href="/support" label="Customer Support" />
                <DropdownItem href="/shipping" label="Shipping & Returns" />
              </DropdownGroup>
            </Dropdown>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ title, children, isOpen, onClick }) => (
  <li className={styles.dropdown__item}>
    <div className={classNames(styles.nav__link, styles.dropdown__button)} onClick={onClick}>
      {title} <i className={classNames("ri-arrow-down-s-line", styles.dropdown__arrow)}></i>
    </div>
    <div className={classNames(styles.dropdown__container, { [styles.showDropdown]: isOpen })}>
      <div className={styles.dropdown__content}>{children}</div>
    </div>
  </li>
);

const DropdownGroup: React.FC<DropdownGroupProps> = ({ icon, title, children }) => (
  <div className={styles.dropdown__group}>
    <div className={styles.dropdown__icon}>
      <i className={icon}></i>
    </div>
    <span className={styles.dropdown__title}>{title}</span>
    <ul className={styles.dropdown__list}>{children}</ul>
  </div>
);

const DropdownItem: React.FC<DropdownItemProps> = ({ href, label }) => (
  <li>
    <a href={href} className={styles.dropdown__link}>{label}</a>
  </li>
);

export default DesktopHeader;