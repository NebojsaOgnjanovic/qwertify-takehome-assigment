import { Button, StyleSheet, Text, View } from "react-native";
import { useAppDispatch } from "../store";
import { logout } from "../store/slices/authSlice";
import { useGetUsersQuery } from "../services/users";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { data: users } = useGetUsersQuery({ page: 1 });

  console.log(users);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
