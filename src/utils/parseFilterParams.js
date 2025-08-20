

export const parseFilterParams = (query) => {
    const { category, ingredients, title } = query;
    
    const parsedCategory = category || null;
    const parsedIngredients = ingredients ? ingredients.split(',') : null;
    const parsedTitle = title || null;
  return {
        category: parsedCategory,
        ingredients: parsedIngredients,
        title: parsedTitle
      
  };
};