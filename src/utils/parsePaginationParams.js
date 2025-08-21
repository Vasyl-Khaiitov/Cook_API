


const parseNumber = (value, defaultValue) => {
    
  if (typeof value === 'undefined' || typeof value !== 'string') {
    return defaultValue;
  }
    const parsedValue = parseInt(value);
    
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};


export const parsePaginationParams = (query) => {

    const { page, perPage } = query;

    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 12);
    
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};
