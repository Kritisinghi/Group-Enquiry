"use client";
import type { FormConfig, Inputs } from "@/app/types/form";
import Accordion from "@/components/Accordion";
import { useState } from "react";
import FormField from "./FormField";
import { useIsJsEnabled } from "@/app/context/JsEnabledContext";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  config: FormConfig;
};

const FormRenderer = ({ config }: Props) => {
  const isJsEnabled = useIsJsEnabled();
  const [openSection, setOpenSection] = useState<string>(config.sections[0].id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<Inputs>();

  const handleContinue = async (currentSectionId: string) => {
    const currentSectionIndex = config.sections.findIndex(
      (section) => section.id === currentSectionId,
    );

    if (currentSectionIndex === -1) return;

    const currentSectionFields = config.sections[
      currentSectionIndex
    ].fields.map((field) => field.name);

    const isValid = await trigger(currentSectionFields);

    if (isValid) {
      const nextSection = config.sections[currentSectionIndex + 1];
      if (nextSection) {
        setOpenSection(nextSection.id);
      }
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? "" : sectionId);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isJsEnabled) {
      try {
        const response = await fetch("/api/groupEnquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          alert(
            "Form submitted successfully! Check console for API response. (This alert is client-side only)",
          );
          console.log("API Response:", result);
          reset();
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);

          if (errorData.errors) {
            let errorMessage = "Validation errors occurred:\n";
            for (const key in errorData.errors) {
              errorMessage += `- ${key}: ${errorData.errors[key]}\n`;
            }
            alert(errorMessage + "\nPlease correct the highlighted fields.");
          } else {
            alert(
              `Form submission failed: ${errorData.message || "Unknown error"}. (This alert is client-side only)`,
            );
          }
        }
      } catch (error) {
        console.error("Network or unexpected error during submission:", error);
        alert(
          "An unexpected error occurred. Please try again. (This alert is client-side only)",
        );
      }
    }
  };

  return (
    <>
      <form
        action="/api/submit-form"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg">
        {config.sections.map((section, index) => (
          <Accordion
            key={section.id}
            title={section.title}
            isOpen={openSection === section.id}
            onClick={() => toggleSection(section.id)}
            showContinueButton={true}
            onContinue={() => handleContinue(section.id)}
            isLastSection={index === config.sections.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  register={register}
                  error={errors}
                />
              ))}
            </div>
            {index === config.sections.length - 1 && (
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300">
                  Submit Group Booking Request
                </button>
              </div>
            )}
          </Accordion>
        ))}
      </form>
    </>
  );
};

export default FormRenderer;
