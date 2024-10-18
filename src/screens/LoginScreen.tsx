import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QWInput from "../components/QWInput"; // Adjust the import path as necessary
import useLoginForm from "../hooks/useLoginForm";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    errors,
    handleLogin,
  } = useLoginForm();

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
        value={email}
        onChangeText={handleEmailChange}
        error={errors.email}
      />
      <QWInput
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        error={errors.password}
      />

      <Button title="Login" onPress={handleLogin} />
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
