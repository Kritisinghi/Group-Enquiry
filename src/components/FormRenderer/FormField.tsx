import type { FormField } from "@/app/types/form";
import { FieldErrors } from "react-hook-form";

type FormFieldProps = {
  field: FormField;
  register: (
    name: string,
    options?: any,
  ) => {
    onChange: (event: React.ChangeEvent<any>) => Promise<void | boolean>;
    onBlur: (event: React.FocusEvent<any>) => Promise<void | boolean>;
    ref: React.Ref<any>;
    name: string;
  };
  error?: FieldErrors;
};

const FormField = ({ field, register, error }: FormFieldProps) => {
  const fieldError = error && error[field.name];
  const validationRules: any = {
    required: field.required
      ? field.requiredMessage || `${field.label} is required.`
      : false,
  };

  if (field.minLength) {
    validationRules.minLength = {
      value: field.minLength,
      message: `${field.label} must be at least ${field.minLength} characters.`,
    };
  }
  if (field.maxLength) {
    validationRules.maxLength = {
      value: field.maxLength,
      message: `${field.label} must be at most ${field.maxLength} characters.`,
    };
  }
  if (field.pattern) {
    validationRules.pattern = {
      value: field.pattern,
      message: `Invalid format for ${field.label}.`,
    };
  }
  if (field.type === "number" && field.min !== undefined) {
    validationRules.min = {
      value: field.min,
      message: `${field.label} must be at least ${field.min}.`,
    };
  }

  const inputClasses = `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
    fieldError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300"
  }`;
  // TODO: Move form types to constant
  return (
    <div
      className={`flex flex-col ${field.type === "textarea" || field.type === "checkbox" ? "md:col-span-2" : ""}`}>
      {field.type !== "checkbox" && (
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </label>
      )}
      {field.type === "select" ? (
        <select
          id={field.name}
          className={`${inputClasses} appearance-none pr-8 bg-white`}
          {...register(field.name, validationRules)}
          aria-invalid={fieldError ? "true" : "false"}>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={field.name}
          className={inputClasses}
          rows={4}
          placeholder={field.placeholder}
          {...register(field.name, validationRules)}
          aria-invalid={fieldError ? "true" : "false"}
        />
      ) : field.type === "checkbox" ? (
        <div className="flex items-center mt-2">
          <input
            id={field.name}
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            {...register(field.name, validationRules)}
            aria-invalid={fieldError ? "true" : "false"}
          />
          <label
            htmlFor={field.name}
            className="ml-2 block text-sm text-gray-900">
            {field.label}
          </label>
        </div>
      ) : field.type === "radio" ? (
        <div className="mt-2 flex flex-col space-y-2">
          {field.options?.map((option) => (
            <div
              key={`${field.name}-${option.value}`}
              className="flex items-center">
              <input
                id={`${field.name}-${option.value}`}
                name={field.name}
                type="radio"
                value={option.value}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                {...register(field.name, validationRules)}
                aria-invalid={fieldError ? "true" : "false"}
              />
              <label
                htmlFor={`${field.name}-${option.value}`}
                className="ml-2 block text-sm text-gray-900">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input
          id={field.name}
          type={field.type}
          placeholder={field.placeholder}
          className={inputClasses}
          {...register(field.name, validationRules)}
          aria-invalid={fieldError ? "true" : "false"}
        />
      )}

      {/* Inline error message */}
      {fieldError && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
};

export default FormField;
