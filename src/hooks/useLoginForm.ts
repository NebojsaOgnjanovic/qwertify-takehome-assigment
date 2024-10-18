import { useState } from "react";
import { Alert } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateFields = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleLogin = () => {
    const isValid = validateFields();

    if (!isValid) {
      return;
    }

    Alert.alert("Login Successful", "You have logged in successfully");
  };

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    errors,
    handleLogin,
  };
};

export default useLoginForm;
