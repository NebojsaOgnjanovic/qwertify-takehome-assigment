import { Alert } from "react-native";
import { act, renderHook } from "@testing-library/react-native";
import { ZodSchema, z } from "zod";
import useForm from "../useForm"; // Adjust path accordingly

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockSubmitAction = jest.fn();
const mockSuccessAction = jest.fn();

const validationSchema: ZodSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
});

const initialState = { name: "", email: "" };

describe("useForm hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct state", () => {
    const { result } = renderHook(() =>
      useForm(initialState, validationSchema, mockSubmitAction)
    );

    expect(result.current.formData).toEqual(initialState);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it("should update formData and clear errors on field change", () => {
    const { result } = renderHook(() =>
      useForm(initialState, validationSchema, mockSubmitAction)
    );

    act(() => {
      result.current.handleFieldChanged("name", "John Doe");
    });

    expect(result.current.formData.name).toBe("John Doe");
    expect(result.current.errors.name).toBeUndefined();
  });

  it("should validate fields and set errors if validation fails", () => {
    const { result } = renderHook(() =>
      useForm(initialState, validationSchema, mockSubmitAction)
    );

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.errors).toEqual({
      name: "Name is required",
      email: "Invalid email",
    });
    expect(result.current.isLoading).toBe(false);
    expect(mockSubmitAction).not.toHaveBeenCalled();
  });

  it("should submit the form when validation passes", async () => {
    const { result } = renderHook(() =>
      useForm(
        { name: "John Doe", email: "john@example.com" },
        validationSchema,
        mockSubmitAction,
        mockSuccessAction
      )
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isLoading).toBe(false); // Loading should be false after submission
    expect(mockSubmitAction).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(mockSuccessAction).toHaveBeenCalled();
  });

  it("should handle submission errors", async () => {
    mockSubmitAction.mockRejectedValueOnce(new Error("Submit failed"));

    const { result } = renderHook(() =>
      useForm(
        { name: "John Doe", email: "john@example.com" },
        validationSchema,
        mockSubmitAction
      )
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(Alert.alert).toHaveBeenCalledWith("Error", "Submit failed");
    expect(result.current.isLoading).toBe(false);
  });

  it("should not submit if already loading", async () => {
    const { result } = renderHook(() =>
      useForm(
        { name: "John Doe", email: "john@example.com" },
        validationSchema,
        mockSubmitAction
      )
    );

    // Simulate form submission that sets isLoading to true
    await act(async () => {
      await result.current.handleSubmit();

      // Simulate another submission while loading
      await act(async () => {
        await result.current.handleSubmit();
      });
    });

    expect(mockSubmitAction).toHaveBeenCalledTimes(1); // Should only be called once
  });
});
