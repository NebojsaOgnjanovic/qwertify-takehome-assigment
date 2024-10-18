import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

type ButtonVariant = "primary" | "secondary";

export type VariantButtonProps = TouchableOpacityProps & {
  variant: ButtonVariant;
  label: string;
};

const VariantButton = ({
  variant,
  label,
  style,
  ...props
}: VariantButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      {...props}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
  },
  secondaryButton: {
    backgroundColor: "#F44336",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});

export default VariantButton;
