import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppDispatch } from "../store";
import { logout } from "../store/slices/authSlice";
import { useGetUsersQuery } from "../services/users";

import UserCard from "../components/UserCard";
import { useState } from "react";
import { User } from "../types/user";

const flatListOptions = {
  initialNumToRender: 6,
};

type FlatListItemRenderType = {
  index: number;
  item: User;
};

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const { data: usersData, isLoading, isFetching } = useGetUsersQuery({ page });

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderItem = ({ index, item }: FlatListItemRenderType) => {
    return <UserCard {...item} />;
  };

  const handleOneEndReached = () => {
    if (isFetching || isLoading || usersData?.data.length === usersData?.total)
      return;
    setPage((prev) => prev + 1);
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
    padding: 20,
  },
});

export default HomeScreen;
