// product-card.component.tsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { navigateTo } from "../../utils/helpers/navigate";
import { addItemToCart } from "../../store/cart/cart.reducer";
import { CategoryItem } from "../../store/category/category.types";
import { selectIsProductInWishlist } from "../../store/wishlist/wishlist.selector";
import { addToWishlist, removeFromWishlist } from "../../store/wishlist/wishlist.reducer";
import css from "./product-card.module.css";

type ProductCardProps = {
  product: CategoryItem;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
};

const ProductCard = ({
  product,
  onAddToWishlist,
  onRemoveFromWishlist,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = navigateTo(navigate);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if product is in wishlist
  const isInWishList = useSelector(selectIsProductInWishlist(product.id));
  
  const { brand, name, price, thumbnailUrl, gallery, discountPercentage, nominalDiscount, salesBadge } = product;
  
  // Determine which image to display based on hover state
  // Changed to show the second gallery image (index 1) instead of the first (index 0)
  const displayImageUrl = isHovered && gallery && gallery.length > 1 
    ? gallery[1] 
    : thumbnailUrl;
  
  const addProductToCartHandler = () => dispatch(addItemToCart(product));
  
  const wishlistHandler = () => {
    if (isInWishList) {
      dispatch(removeFromWishlist(product.id));
      onRemoveFromWishlist?.();
    } else {
      dispatch(addToWishlist(product.id));
      onAddToWishlist?.();
    }
  };

  // Format price to Indonesian Rupiah format
  const formatPrice = (priceString: string) => {
    // Check if price already contains "Rp" prefix
    if (priceString.startsWith('Rp')) {
      return priceString; // Return the original price string if it's already formatted
    }
    
    // If we need to parse and format the price
    // First, clean the string from non-numeric characters except decimal point
    const cleanPrice = priceString.replace(/[^\d.]/g, '');
    const numericPrice = parseFloat(cleanPrice);
    
    if (isNaN(numericPrice)) {
      return priceString; // Fallback to original string if parsing fails
    }
    
    return `Rp${numericPrice.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(/\./g, ",").replace(/,00$/, ",00")}`;
  };

  // Format current price and original price
  const formattedPrice = formatPrice(price);
  const formattedOriginalPrice = nominalDiscount ? formatPrice(nominalDiscount) : null;
  
  // Check if product has original price to display
  const hasOriginalPrice = nominalDiscount && nominalDiscount.trim() !== '';

  // Parse discount percentage from product data
  const getDiscountPercentage = () => {
    // If discount percentage is directly available in the product data
    if (discountPercentage) {
      // Remove any non-numeric characters and convert to number
      const cleanPercentage = parseInt(discountPercentage.replace(/\D/g, ''), 10);
      if (!isNaN(cleanPercentage)) {
        return cleanPercentage;
      }
    }
    
    // If we have both price and nominalDiscount, calculate the percentage
    if (price && nominalDiscount) {
      // Extract numeric values
      const extractPrice = (priceStr: string): number => {
        const cleanStr = priceStr.replace(/Rp\s*/g, '').replace(/\./g, '');
        return parseInt(cleanStr, 10);
      };
      
      const currentPrice = extractPrice(price);
      const originalPrice = extractPrice(nominalDiscount);
      
      if (!isNaN(currentPrice) && !isNaN(originalPrice) && originalPrice > 0) {
        const discountPercent = Math.round((1 - (currentPrice / originalPrice)) * 100);
        return discountPercent > 0 ? discountPercent : null;
      }
    }
    
    return null;
  };

  // Get the discount percentage to display
  const discountPercent = getDiscountPercentage();

  // Check if product has a sales badge to display
  const hasSalesBadge = salesBadge && salesBadge.trim() !== '';

  return (
    <div className={css.product}>
      <div 
        className={css.imageContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          className={css.productImage} 
          src={displayImageUrl} 
          alt={name} 
          onError={(e) => {
            // Fallback to thumbnail if gallery image fails to load
            const target = e.target as HTMLImageElement;
            if (target.src !== thumbnailUrl) {
              target.src = thumbnailUrl;
            }
          }}
        />
        
        {/* Display discount badge if available */}
        {discountPercent !== null && (
          <div className={css.discountBadge}>
            -{discountPercent}%
          </div>
        )}
        
        {/* Display sales badge (10RB+ terjual) if available */}
        {hasSalesBadge && (
          <div className={css.salesBadge}>
            {salesBadge}
          </div>
        )}
        
        <div className={css.hoverActions}>
          <button 
            className={`${css.iconButton} ${css.wishlistButton} ${isInWishList ? css.active : ''}`}
            onClick={wishlistHandler}
            aria-label={isInWishList ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg 
              className={`${css.icon} ${isInWishList ? css.wishlistActive : ''}`} 
              viewBox="0 0 24 24" 
              fill={isInWishList ? "black" : "white"} 
              stroke="none"
            >
              <path d="M17,3H7C5.9,3,5,3.9,5,5v16l7-3l7,3V5C19,3.9,18.1,3,17,3z" />
            </svg>
          </button>
            
          <button 
            className={`${css.iconButton} ${css.cartButton}`} 
            onClick={addProductToCartHandler}
            aria-label="Add to bag"
          >
            <svg className={css.icon} viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={css.productDetails}>
        <h4 className={css.productDetailsBrand}>{brand}</h4>
        <h3
          onClick={() => handleNavigate(`/product/${product.id}`)}
          className={css.productDetailsTitle}
        >
          {name}
        </h3>
        
        {/* Price display section with current price and original price */}
        <div className={css.priceWrapper}>
          <div className={css.priceContainer}>
            {/* Current price (discount price) shown on the left */}
            <span className={css.currentPrice}>{formattedPrice}</span>
            
            {/* Original price shown on the right if available */}
            {hasOriginalPrice && (
              <span className={css.originalPrice}>{formattedOriginalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;