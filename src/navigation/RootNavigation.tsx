import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store";

const RootNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
