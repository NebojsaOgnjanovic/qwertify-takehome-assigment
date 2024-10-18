import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { User } from "../types/user";
import ActionButton from "./ActionButton"; // Import the new ActionButton component

export type UserCardProps = User & {
  onPressEdit?: () => void;
  onPressDelete?: () => void;
};

const UserCard = ({
  avatar,
  email,
  firstName,
  lastName,
  onPressEdit,
  onPressDelete,
}: UserCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={{ gap: 16 }}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <ActionButton variant="primary" label="Edit" onPress={onPressEdit} />
          <ActionButton
            variant="secondary"
            label="Delete"
            onPress={onPressDelete}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginBottom: 16,
    gap: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {},
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default UserCard;
