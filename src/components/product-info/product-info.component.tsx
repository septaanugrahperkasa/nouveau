import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoChevronDown } from 'react-icons/go';

import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/wishlist/wishlist.reducer";
import {
  selectProductAverageStars,
  selectProductReviews,
} from "../../store/review/review.selector";
import { selectIsProductInWishlist } from "../../store/wishlist/wishlist.selector";

import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { CategoryItem } from "../../store/category/category.types";
import { AppDispatch } from "../../store/store";

import css from "./product-info.module.css";

type ProductInfoProps = {
  product: CategoryItem | undefined;
  isMobile: boolean;
};

// Define a type for the product details sections
type ProductDetailSection = {
  title: string;
  content: React.ReactNode;
};

const ProductInfo = ({ product, isMobile }: ProductInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: productID } = useParams() as { id: string };
  const reviews = useSelector(selectProductReviews(productID));
  const productAverageStars = useSelector(selectProductAverageStars(productID));
  const isProductInWishlist = useSelector(
    selectIsProductInWishlist(+productID)
  );
  
  // Initialize with empty set and populate it later when productDetails are constructed
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Updated function to use discountPercentage from database if available, otherwise calculate it
  const calculateDiscountPercentage = useMemo(() => {
    // Check if discountPercentage is available in the database
    if (product?.discountPercentage) {
      // Remove any non-numeric characters and convert to number
      const cleanPercentage = parseInt(product.discountPercentage.replace(/\D/g, ''), 10);
      if (!isNaN(cleanPercentage)) {
        return cleanPercentage;
      }
    }
    
    // Fall back to calculation if discountPercentage isn't available or valid
    if (!product?.price || !product?.nominalDiscount) return null;
    
    // Extract numeric values from price and discount strings
    const extractPrice = (priceStr: string): { min: number, max: number } => {
      // Remove "Rp" and replace thousand separators (dots)
      const cleanStr = priceStr.replace(/Rp\s*/g, '').replace(/\./g, '');
      
      // Check if it's a range (contains a hyphen)
      const parts = cleanStr.split('-').map(part => part.trim());
      
      if (parts.length === 2) {
        return {
          min: parseInt(parts[0], 10),
          max: parseInt(parts[1], 10)
        };
      }
      
      // Single price value
      const singlePrice = parseInt(cleanStr, 10);
      return {
        min: singlePrice,
        max: singlePrice
      };
    };
    
    const currentPrice = extractPrice(product.price);
    const originalPrice = extractPrice(product.nominalDiscount);
    
    // Marketplace approach: using lowest current price and highest original price
    // This gives the highest possible discount percentage
    const currentLowest = currentPrice.min;
    const originalHighest = originalPrice.max;
    
    if (isNaN(currentLowest) || isNaN(originalHighest) || originalHighest === 0) {
      return null;
    }
    
    const discountPercentage = Math.round((1 - (currentLowest / originalHighest)) * 100);
    return discountPercentage > 0 ? discountPercentage : null;
  }, [product?.price, product?.nominalDiscount, product?.discountPercentage]);

  const productDetails = useMemo(() => {
    const details: ProductDetailSection[] = [];
        
    // Add HOW TO USE if data exists
    if (product?.howToUse && product.howToUse.length > 0) {
      details.push({
        title: 'HOW TO USE',
        content: (
          <ol className={css["how-to-use-list"]}>
            {product.howToUse.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        )
      });
    }

        // Only add PRODUCTS section if data exists
        if (product?.Products && Object.keys(product.Products).length > 0) {
          details.push({
            title: 'PRODUCTS',
            content: (
              <ul className={css["products-list"]}>
                {Object.entries(product.Products).map(([key, url], index) => (
                  <li key={index} className={css["products-item"]}>
                    <span className={css["link-icon"]}>🔗</span>
                    <a 
                      href={url as string} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={css["products-link"]}
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            )
          });
        }
            
    // Only add EXPLORE section if data exists
    if (product?.Explore && Object.keys(product.Explore).length > 0) {
      details.push({
        title: 'EXPLORE',
        content: (
          <ul className={css["explore-list"]}>
            {Object.entries(product.Explore).map(([key, url], index) => (
              <li key={index} className={css["explore-item"]}>
                <span className={css["link-icon"]}>🔗</span>
                <a 
                  href={url as string} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={css["explore-link"]}
                >
                  {key}
                </a>
              </li>
            ))}
          </ul>
        )
      });
    }
    
    // Add productHighlights if data exists
    if (product?.productHighlights && product.productHighlights.length > 0) {
      details.push({
        title: 'PRODUCT HIGHLIGHTS',
        content: (
          <ul className={css["product-highlights-list"]}>
            {product.productHighlights.map((feature, index) => (
              <li key={index} className={css["product-highlights-item"]}>
                {feature}
              </li>
            ))}
          </ul>
        )
      });
    }
    
    // Add INGREDIENTS if data exists
    if (product?.ingredientsList && product.ingredientsList.length > 0) {
      details.push({
        title: 'INGREDIENTS',
        content: (
          <p className={css["ingredients-content"]}>
            {product.ingredientsList.join(', ')}
          </p>
        )
      });
    }
    
    // Add SHIPPING & DELIVERY if data exists
    if (product?.shippingInfo) {
      details.push({
        title: 'SHIPPING & DELIVERY',
        content: (
          <div className={css["shipping-info"]}>
            {product.shippingInfo}
          </div>
        )
      });
    }
    
    // Add Targets if data exists
    if (product?.targets && product.targets.length > 0) {
      details.push({
        title: 'TARGETS',
        content: product.targets.map((target, i) => (
          <span className={css["item-target"]} key={target}>
            {i === 0 ? target : `, ${target}`}
          </span>
        ))
      });
    }
    
    // Add Suited to if data exists
    if (product?.suited) {
      details.push({
        title: 'SUITED TO',
        content: product.suited
      });
    }
    
    // Add Properties if data exists
    if (product?.productProperties && product.productProperties.length > 0) {
      details.push({
        title: 'PROPERTIES',
        content: (
          <div className={css["item-properties-list"]}>
            {product.productProperties.map((prop) => (
              <div key={prop} className={css["item-property"]}>
                <span className={css["item-property-name"]}>
                  {prop.toLowerCase()}
                </span>
                <span className={css["item-property-check"]}>&#10003;</span>
              </div>
            ))}
          </div>
        )
      });
    }
        
    // Add Production if data exists
    if (product?.Production && product.Production.length > 0) {
      details.push({
        title: 'MANUFACTURE INFORMATION',
        content: (
          <div className={css["production-container"]}>
            {product.Production.length > 1 ? (
              <>
                <ul className={css["production-list"]}>
                  {product.Production.slice(0, -1).map((info, index) => (
                    <li key={index} className={css["production-item"]}>
                      {info}
                    </li>
                  ))}
                </ul>
                <p className={css["production-paragraph"]}>
                  {product.Production[product.Production.length - 1]}
                </p>
              </>
            ) : (
              <p className={css["production-paragraph"]}>
                {product.Production[0]}
              </p>
            )}
          </div>
        )
      });
    }
    
    // Auto-select "HOW TO USE" section if it exists
    if (details.length > 0) {
      // Set a timeout to ensure state update happens after render
      setTimeout(() => {
        setOpenSections(prev => {
          const newSet = new Set(prev);
          
          // Find HOW TO USE in the details
          const howToUseSection = details.find(section => section.title === 'HOW TO USE');
          if (howToUseSection) {
            newSet.add('HOW TO USE');
          }
          
          return newSet;
        });
      }, 0);
    }
    
    return details;
  }, [product]);

  const addProductToWishlistHandler = () => {
    if (product) {
      dispatch(addToWishlist(product.id));
    }
  };

  const removeProductToWishlistHandler = () => {
    dispatch(removeFromWishlist(+productID));
  };

  return (
    <div
      className={`${css["item-description"]} ${
        isMobile ? css["smaller-screen"] : ""
      }`}
    >
      <h1 className={css["item-title"]}>
        <span className={css["item-brand"]}>{product?.brand}</span>
        {product?.name}
      </h1>
      <div className={css["item-rating"]}>
        <Rating
          name="text-feedback"
          value={productAverageStars}
          readOnly
          className={css["full-stars"]}
          precision={0.1}
          emptyIcon={<StarIcon className={css["empty-stars"]} />}
        />

        <span>
          ({reviews.length} {reviews.length !== 1 ? "reviews" : "review"})
        </span>
      </div>

      <div className={css["prices-container"]}>
        <div className={css["price-info"]}>
          <div className={css["current-price"]}>
            <span className={css["price-prefix"]}>Rp</span>
            <span className={css["price-text"]}>{product?.price.replace('Rp', '')}</span>
          </div>
          {product?.nominalDiscount && (
            <div className={css["discount-price"]}>
              <span className={css["discount-prefix"]}><s>Rp</s></span>
              <span className={css["discount-text"]}><s>{product?.nominalDiscount.replace('Rp', '')}</s></span>
            </div>
          )}
        </div>
        {calculateDiscountPercentage !== null && (
          <div className={css["discount-badge"]}>
            -{calculateDiscountPercentage}%
          </div>
        )}
      </div>
      
      <div className={css["item-volume"]}>{product?.volume}</div>
      <p className={css["item-desc-text"]}>{product?.description}</p>
        
      <div className={css["item-grouped-buttons"]}>
        <a
          href={product?.affiliateLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={css["add-to-bag-link"]}
        >
          ADD TO BAG
        </a>
        {isProductInWishlist ? (
          <Button
            buttonType={BUTTON_TYPE_CLASSES.basic}
            onClick={removeProductToWishlistHandler}
          >
            REMOVE FROM YOUR WISH LIST
          </Button>
        ) : (
          <Button
            buttonType={BUTTON_TYPE_CLASSES.basic}
            onClick={addProductToWishlistHandler}
          >
            ADD TO YOUR WISH LIST
          </Button>
        )}
      </div>

      <div className={css["product-info-sections"]}>
        {productDetails.map((section) => (
          <div key={section.title} className={css["info-section"]}>
            <button 
              onClick={() => toggleSection(section.title)}
              className={css["section-header"]}
              aria-expanded={openSections.has(section.title)}
            >
              <span>{section.title}</span>
              <div className={`${css["chevron-icon"]} ${openSections.has(section.title) ? css["rotated"] : ''}`}>
                <GoChevronDown />
              </div>
            </button>
            <div 
              className={`${css["section-content"]} ${openSections.has(section.title) ? css["content-visible"] : css["content-hidden"]}`}
              aria-hidden={!openSections.has(section.title)}
            >
              <div className={css["content-wrapper"]}>
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;