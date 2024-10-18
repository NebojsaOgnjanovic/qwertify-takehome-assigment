import { useState } from "react";
import { Alert } from "react-native";
import { z, ZodSchema, ZodError } from "zod";
import { useAppDispatch } from "../store";

const useForm = <T extends Record<string, any>>(
  initialState: T,
  validationSchema: ZodSchema<T>,
  onSubmitAction: (data: T) => Promise<any>,
  successAction?: (data: any) => void
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validate fields using the passed schema
  const validateFields = (): boolean => {
    try {
      validationSchema.parse(formData); // This will throw if validation fails
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
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

  // Generic handler for field changes
  const handleFieldChanged = (name: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  // Handle submit action (login, add user, edit user)
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
