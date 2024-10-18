import { useState } from "react";
import { Alert } from "react-native";
import { z } from "zod";
import { useLoginMutation } from "../services/auth";
import { useAppDispatch } from "../store";
import { login } from "../store/slices/authSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const useLoginForm = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateFields = () => {
    const result = loginSchema.safeParse({
      email: credentials.email,
      password: credentials.password,
    });

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

  const handleCredentialChanged = (text: string, name: string) => {
    setCredentials((prev) => ({ ...prev, [name]: text }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleLogin = async () => {
    if (isLoading) return;

    const isValid = validateFields();

    if (!isValid) return;

    const response = await loginUser({
      email: credentials.email,
      password: credentials.password,
    });

    if (response.error || !response.data) {
      Alert.alert(
        "Invalid credentials",
        "Please check your email and password"
      );
      return;
    }

    dispatch(login({ token: response.data.token }));
  };

  return {
    credentials,
    errors,
    isLoading,
    handleCredentialChanged,
    handleLogin,
  };
};

export default useLoginForm;
