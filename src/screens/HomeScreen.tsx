import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import VariantButton from "../components/ActionButton";
import UserCard from "../components/UserCard";
import { RootAppStackParamList } from "../navigation/AppNavigator";
import { useGetUsersQuery } from "../services/users";
import { useAppDispatch } from "../store";
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
  const navigation = useNavigation<NavigationProp<RootAppStackParamList>>();
  const [page, setPage] = useState(1);

  const { data: usersData, isLoading, isFetching } = useGetUsersQuery({ page });

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
