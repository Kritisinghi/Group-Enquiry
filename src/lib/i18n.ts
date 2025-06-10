export const locales = ["en", "de"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export function isValidLocale(
  locale: string
): locale is (typeof locales)[number] {
  return locales.includes(locale as any);
}

export async function loadLocaleData(
  locale: Locale,
  path: String
): Promise<any> {
  try {
    const response = await import(`../locales/${locale}/${path}`);
    return response.default;
  } catch (error) {
    throw new Error(`Could not load locale data for ${locale}.`);
  }
}
