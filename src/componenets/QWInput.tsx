import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export interface QWInputProps extends TextInputProps {}

const QWInput: React.FC<QWInputProps> = (props) => {
  const { style, ...rest } = props;

  return <TextInput style={[styles.input, style]} {...rest} />;
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
});

export default QWInput;
