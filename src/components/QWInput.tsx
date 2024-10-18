import React from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
} from "react-native";

export interface QWInputProps extends TextInputProps {
  error?: string; // Add an error prop
}

const QWInput: React.FC<QWInputProps> = (props) => {
  const { style, error, ...rest } = props;

  return (
    <View>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]} // Add red border on error
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  inputError: {
    borderColor: "red", // Red border for validation error
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});

export default QWInput;
