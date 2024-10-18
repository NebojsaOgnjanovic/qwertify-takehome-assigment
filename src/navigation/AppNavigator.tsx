import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddEditUserScreen from "../screens/AddEditUserScreen";
import { User } from "../types/user";

export type RootAppStackParamList = {
  Home: undefined;
  AddEditUser?: User;
};

const Stack = createNativeStackNavigator<RootAppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddEditUser" component={AddEditUserScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
