export function flattenLocaleData(
  obj: object,
  prefix: string = "",
  res: { [key: string]: string } = {},
): { [key: string]: string } {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = (obj as any)[key];
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flattenLocaleData(value, newKey, res);
      } else if (typeof value === "string") {
        res[newKey] = value;
      } else {
        console.warn(
          `Non-string leaf value found at key: ${newKey}. Value: ${value}`,
        );
        res[newKey] = String(value);
      }
    }
  }
  return res;
}
