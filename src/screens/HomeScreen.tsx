import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppDispatch } from "../store";
import { logout } from "../store/slices/authSlice";
import { useGetUsersQuery } from "../services/users";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import UserCard from "../components/UserCard";
import { User } from "../types/user";
import VariantButton from "../components/ActionButton";
import { RootAppStackParamList } from "../navigation/AppNavigator";

const flatListOptions = {
  initialNumToRender: 6,
};

type FlatListItemRenderType = {
  index: number;
  item: User;
};

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootAppStackParamList>>();
  const [page, setPage] = useState(1);

  const { data: usersData, isLoading, isFetching } = useGetUsersQuery({ page });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditUser = (user: User) => {
    navigation.navigate("AddEditUser", user);
  };

  const handleAddUser = () => {
    navigation.navigate("AddEditUser");
  };

  const renderItem = ({ index, item }: FlatListItemRenderType) => {
    return (
      <UserCard
        {...item}
        onPressEdit={() => handleEditUser(item)}
        onPressDelete={() => console.log("Delete user", item.id)}
      />
    );
  };

  const handleOneEndReached = () => {
    if (isFetching || isLoading || usersData?.data.length === usersData?.total)
      return;
    setPage((prev) => prev + 1);
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.screenContainer}>
      <FlatList
        ListEmptyComponent={<Text>No users available</Text>}
        {...flatListOptions}
        contentContainerStyle={styles.container}
        data={usersData?.data}
        onEndReached={handleOneEndReached}
        refreshing={isLoading}
        renderItem={renderItem}
        testID="users-list"
      />
      <VariantButton
        variant="primary"
        label="Add New User"
        onPress={handleAddUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    width: "100%",
    gap: 20,
    paddingBottom: 20,
  },
});

export default HomeScreen;
