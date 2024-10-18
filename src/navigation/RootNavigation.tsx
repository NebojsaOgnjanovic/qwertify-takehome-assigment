import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
