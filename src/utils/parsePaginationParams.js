function parseNmber(value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue) === true) {
    return defaultValue;
  }
  return parsedValue;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNmber(page, 1);
  const pasedPerPage = parseNmber(perPage, 12);

  return {
    page: parsedPage,
    perPage: pasedPerPage,
  };
}
