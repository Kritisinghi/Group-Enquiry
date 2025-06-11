export type FormOption = {
  value: string;
  label: string;
};

type Inputs = Record<string, any>;

export type FormField = {
  title?: string;
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "date"
    | "select"
    | "textarea"
    | "checkbox"
    | "tel"
    | "radio";
  placeholder?: string;
  required: boolean;
  min?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  options?: FormOption[]; // Specific to select and radio type inputs
  requiredMessage?: string;
};

export type FormSection = {
  id: string;
  title: string;
  fields: FormField[];
};

export type FormConfig = {
  title: string;
  description: ReactNode;
  nextStep: string;
  submit: string;
  sections: FormSection[];
};
