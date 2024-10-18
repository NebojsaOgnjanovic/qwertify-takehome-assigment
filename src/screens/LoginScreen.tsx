import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { z } from "zod";
import QWInput from "../components/QWInput"; // Adjust the import path as necessary
import { useLoginMutation } from "../services/auth";
import { useAppDispatch } from "../store";
import useForm from "../hooks/useForm";
import { login } from "../store/slices/authSlice";

const { width, height } = Dimensions.get("window");

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginScreen = () => {
  const [loginUser] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { formData, errors, isLoading, handleFieldChanged, handleSubmit } =
    useForm(
      { email: "eve.holt@reqres.in", password: "cityslicka" }, // Initial form state
      loginSchema,
      async (data) => {
        const response = await loginUser(data);
        if (response.error || !response.data) {
          throw new Error("Invalid credentials");
        }
        dispatch(login({ token: response.data.token }));
      }
    );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/qwertify.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <QWInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleFieldChanged("email", text)}
        error={errors.email}
      />
      <QWInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleFieldChanged("password", text)}
        secureTextEntry
        error={errors.password}
      />

      <Button
        title={isLoading ? "Loading..." : "Login"}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.3,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
