import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { JsEnabledContextProvider } from "../context/JsEnabledContext";
import "../globals.css";

// export async function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children, params }: Props) {
  const d = await params;
  const locale = d.locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <JsEnabledContextProvider>{children}</JsEnabledContextProvider>
      </body>
    </html>
  );
}
