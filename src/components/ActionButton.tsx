import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

type ButtonVariant = "primary" | "secondary";

export type VariantButtonProps = TouchableOpacityProps & {
  variant: ButtonVariant;
  label: string;
  isLoading?: boolean;
};

const VariantButton = ({
  variant,
  label,
  style,
  isLoading,
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
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
