import { getGroupBookingFormConfig } from "@/configs/form/groupBookingSchema";
import type { Locale } from "@/lib/i18n";
import React from "react";
import FormRenderer from "@/components/FormRenderer";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const metadata = {
  title: "Group Booking Enquiry",
};

const Home = async ({ params }: Props) => {
  const { locale } = await params;
  const formRendererConfig = await getGroupBookingFormConfig(locale);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <main className="container mx-auto p-4 md:p-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
          {formRendererConfig.title}
        </h1>
        <p className="text-gray-800">{formRendererConfig.description}</p>
        <FormRenderer config={formRendererConfig} />
      </main>
    </div>
  );
};

export default Home;
