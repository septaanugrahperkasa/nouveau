export type CategoryMap = {
  [key: string]: CategoryItem[];
};

export type CategoryItem = {
  id: number;
  affiliateLink: string;
  name: string;
  brand: string;
  volume: string;
  price: string;
  nominalDiscount: string;
  discountPercentage: string;
  salesBadge: string;
  description: string;
  shippingInfo: string;
  thumbnailUrl: string;
  gallery: string[];
  ingredientsList: string[];
  howToUse: string[];
  productHighlights: string[];
  Production: string[];
  targets: string[];
  suited: string;
  productProperties: string[];
  newArrival: boolean;
  Products: Record<string, string>;
  Explore: Record<string, string>;
};

export type Category = {
  title: string;
  items: CategoryItem[];
};

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};