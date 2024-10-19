export const camelCaseToKebabCase = (key: string): string => {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

export const makeQueryParams = (
  queryObject: Record<
    string,
    string | number | string[] | undefined | boolean | null
  >,
  baseUrl: string
): string => {
  const queryParams = Object.entries(queryObject)
    .filter(([, value]) => value !== undefined && value !== null) // Filter out undefined or null values
    .map(([key, value]) => {
      const formattedKey = camelCaseToKebabCase(key);

      if (Array.isArray(value)) {
        return `${formattedKey}=${value.join(",")}`;
      }

      return `${formattedKey}=${String(value)}`;
    });

  const queryString = queryParams.join("&");
  const separator = queryString ? (baseUrl.includes("?") ? "&" : "?") : "";

  return `${baseUrl}${separator}${queryString}`;
};
