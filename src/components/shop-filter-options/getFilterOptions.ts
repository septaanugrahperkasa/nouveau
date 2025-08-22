import { CategoryMap } from "../../store/category/category.types";

export const getFilterOptions = (categoriesMap: CategoryMap) => {
  // Cek apakah categoriesMap tidak undefined
  if (!categoriesMap) {
    return {
      suited: [],
      productProperties: [],
      targets: [],
      brand: [],
    };
  }

  const suitedOptions = [
    ...Object.values(categoriesMap).reduce((acc, category) => {
      // Cek apakah category ada dan dapat diiterasi
      if (category && Array.isArray(category)) {
        category.forEach((item) => {
          if (item && item.suited) {
            acc.add(item.suited);
          }
        });
      }
      return acc;
    }, new Set<string>()),
  ];

  const propertiesOptions = [
    ...Object.values(categoriesMap).reduce((acc, category) => {
      // Cek apakah category ada dan dapat diiterasi
      if (category && Array.isArray(category)) {
        category.forEach((product) => {
          if (product && product.productProperties && Array.isArray(product.productProperties)) {
            product.productProperties.forEach((property) => {
              if (property) {
                acc.add(property);
              }
            });
          }
        });
      }
      return acc;
    }, new Set<string>()),
  ];

  const targetOptions = [
    ...Object.values(categoriesMap).reduce((acc, category) => {
      // Cek apakah category ada dan dapat diiterasi
      if (category && Array.isArray(category)) {
        category.forEach((product) => {
          if (product && product.targets && Array.isArray(product.targets)) {
            product.targets.forEach((target) => {
              if (target) {
                acc.add(target);
              }
            });
          }
        });
      }
      return acc;
    }, new Set<string>()),
  ];

  const brandOptions = [
    ...Object.values(categoriesMap).reduce((acc, category) => {
      // Cek apakah category ada dan dapat diiterasi
      if (category && Array.isArray(category)) {
        category.forEach((product) => {
          if (product && product.brand) {
            acc.add(product.brand);
          }
        });
      }
      return acc;
    }, new Set<string>()),
  ];

  return {
    suited: suitedOptions,
    productProperties: propertiesOptions,
    targets: targetOptions,
    brand: brandOptions,
  };
};