import React from "react";

import { Text, View, StyleSheet } from "react-native";
import { User } from "../types/user";

export type UserCardProps = User & {
  onPress: () => void;
};

const UserCard = ({
  avatar,
  email,
  firstName,
  lastName,
  onPress,
}: UserCardProps) => {
  return (
    <View style={styles.container}>
      <Text>{email}</Text>
      <Text>{firstName}</Text>
      <Text>{lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 230,
    borderWidth: 2,
  },
});

export default UserCard;
