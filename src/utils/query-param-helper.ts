export const camelCaseToKebabCase = (key: string): string => {
  return `${key
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase()}`;
};

export const makeQueryParams = (
  queryObject: Record<string, string | number | string[] | undefined | boolean>,
  baseUrl: string
): string => {
  const queryParams: string[] = [];

  Object.keys(queryObject).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(queryObject, key)) {
      switch (typeof queryObject[key]) {
        case "string":
          queryParams.push(
            `${camelCaseToKebabCase(key)}=${queryObject[key] as string}`
          );
          break;
        case "number":
          queryParams.push(
            `${camelCaseToKebabCase(key)}=${
              queryObject[key] as unknown as string
            }`
          );
          break;
        case "boolean":
          queryParams.push(
            `${camelCaseToKebabCase(key)}=${
              queryObject[key] as unknown as string
            }`
          );
          break;
        case "object":
          if (Array.isArray(queryObject[key])) {
            queryParams.push(
              `${camelCaseToKebabCase(key)}=${(
                queryObject[key] as string[]
              ).join(",")}`
            );
          }
          break;
        default:
          break;
      }
    }
  });

  const queryString = queryParams.join("&");
  const separator = queryString ? (baseUrl.includes("?") ? "&" : "?") : "";

  return `${baseUrl}${separator}${queryString}`;
};
