

export const parseFilterParams = (query) => {
    const { category, ingredients, title } = query;
    
    const parsedCategory = category || null;
    const parsedIngredients = ingredients || null;
    const parsedTitle = title || null;
  return {
        category: parsedCategory,
        ingredients: parsedIngredients,
        title: parsedTitle
      
  };
};