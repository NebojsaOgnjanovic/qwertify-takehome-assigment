import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import VariantButton from "../components/ActionButton";
import QWInput from "../components/QWInput";
import { User } from "../types/user";
import { RootAppStackParamList } from "../navigation/AppNavigator";

type RootStackParamList = {
  AddEditUser?: User;
};

const AddEditUserScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AddEditUser">>();
  const isEditMode = !!route.params?.id;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? "Edit User" : "Add New User"}
      </Text>

      {/* Form Fields */}
      <QWInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={errors.email}
      />
      <QWInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        error={errors.firstName}
      />
      <QWInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        error={errors.lastName}
      />
      <QWInput
        placeholder="Avatar URL"
        value={avatar}
        onChangeText={(text) => setAvatar(text)}
        error={errors.avatar}
      />
      <VariantButton
        variant="primary"
        label={isEditMode ? "Update User" : "Create User"}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default AddEditUserScreen;
