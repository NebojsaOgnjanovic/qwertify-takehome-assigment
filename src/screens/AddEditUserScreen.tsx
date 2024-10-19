import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Alert, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import VariantButton from "../components/ActionButton";
import QWInput from "../components/QWInput";
import useForm from "../hooks/useForm";
import { RootAppStackParamList } from "../navigation/AppNavigator";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../services/users";
import { User } from "../types/user";
import { mapClientUserToDto } from "../utils/user-object-mapper";

type RootStackParamList = {
  AddEditUser?: User;
};

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  avatar: z.string().url("Invalid avatar URL"),
});

const AddEditUserScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AddEditUser">>();
  const navigation = useNavigation<NavigationProp<RootAppStackParamList>>();
  const isEditMode = !!route.params?.id;

  const [createUser] = useCreateUserMutation();
  const [updatedUser] = useUpdateUserMutation();

  const { formData, errors, isLoading, handleFieldChanged, handleSubmit } =
    useForm(
      // Added data here to avoid having to input manually when testing
      {
        email: route.params?.email || "nebojsa@gmail.com",
        firstName: route.params?.firstName || "Nebojsa",
        lastName: route.params?.lastName || "Ognjanovic",
        avatar:
          route.params?.avatar ||
          "https://lh3.googleusercontent.com/-8_yL2D3_OKI/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmClG-_RXHWAvmUtGT5EoQmEr7qmg/s128-c/photo.jpg",
      },
      userSchema,
      async (data) => {
        try {
          if (isEditMode)
            await updatedUser({
              id: route.params?.id,
              ...mapClientUserToDto(data),
            });
          else await createUser({ ...mapClientUserToDto(data) });

          navigation.navigate("Home");
          Alert.alert(
            "Success",
            `User ${isEditMode ? "updated" : "created"} successfully`
          );
        } catch (error) {
          Alert.alert(
            "Error",
            `Failed to ${isEditMode ? "update" : "create"} user`
          );
        }
      }
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? "Edit User" : "Add New User"}
      </Text>
      <QWInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleFieldChanged("email", text)}
        error={errors.email}
      />
      <QWInput
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => handleFieldChanged("firstName", text)}
        error={errors.firstName}
      />
      <QWInput
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => handleFieldChanged("lastName", text)}
        error={errors.lastName}
      />
      <QWInput
        placeholder="Avatar URL"
        value={formData.avatar}
        onChangeText={(text) => handleFieldChanged("avatar", text)}
        error={errors.avatar}
      />
      <VariantButton
        variant="primary"
        isLoading={isLoading}
        label={isEditMode ? "Update User" : "Create User"}
        style={styles.button}
        onPress={handleSubmit}
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
