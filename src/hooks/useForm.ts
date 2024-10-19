import { useState } from "react";
import { Alert } from "react-native";
import { ZodError, ZodSchema } from "zod";

const useForm = <T extends Record<string, any>>(
  initialState: T,
  validationSchema: ZodSchema<T>,
  onSubmitAction: (data: T) => Promise<any>,
  successAction?: (data: any) => void
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = (): boolean => {
    try {
      validationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: { [key in keyof T]?: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof T;
          formattedErrors[field] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleFieldChanged = (name: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    const isValid = validateFields();
    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await onSubmitAction(formData);

      if (successAction) {
        successAction(response);
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert("Error", error.message);
      else Alert.alert("Error", "Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  return {
    formData,
    errors,
    isLoading,
    handleFieldChanged,
    handleSubmit,
  };
};

export default useForm;
