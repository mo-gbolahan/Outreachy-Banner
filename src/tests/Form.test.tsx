import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import Form from "../components/Form";

const defaultProps = {
  register: vi.fn(),
  errors: {},
  handleSubmit: vi.fn(),
  setBannerText: vi.fn(),
  setFontSize: vi.fn(),
  setFontColor: vi.fn(),
  setTextPosition: vi.fn(),
};

describe("Form Component", () => {
  it("renders the form inputs", () => {
    render(<Form {...defaultProps} />);
    expect(
      screen.getByPlaceholderText(
        "Text that best describe your banner background"
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Banner Text")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Font Size (e.g., 24px, 2rem)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Font Color (e.g., #000000, blue)")
    ).toBeInTheDocument();
    const dropdown = screen.getByTestId("dropdown") as HTMLSelectElement;
    expect(dropdown).toBeInTheDocument();
    //confirming the default value of the dropdown
    expect(dropdown.value).toBe("center");
  });

  it("calls setBannerText on banner text input change", () => {
    render(<Form {...defaultProps} />);
    const bannerTextInputs = screen.getAllByPlaceholderText("Banner Text");
    const bannerTextInput = bannerTextInputs[0];
    fireEvent.change(bannerTextInput, { target: { value: "New Banner Text" } });
    expect(defaultProps.setBannerText).toHaveBeenCalledWith("New Banner Text");
  });

  it("calls setFontSize on font size input change", () => {
    render(<Form {...defaultProps} />);
    const fontSizeInputs = screen.getAllByPlaceholderText(
      "Font Size (e.g., 24px, 2rem)"
    );
    const fontSizeInput = fontSizeInputs[0];
    fireEvent.change(fontSizeInput, { target: { value: "3rem" } });
    expect(defaultProps.setFontSize).toHaveBeenCalledWith("3rem");
  });

  it("calls setFontColor on font color input change", () => {
    render(<Form {...defaultProps} />);
    const fontColorInputs = screen.getAllByPlaceholderText(
      "Font Color (e.g., #000000, blue)"
    );
    const fontColorInput = fontColorInputs[0];
    fireEvent.change(fontColorInput, { target: { value: "#ff0000" } });
    expect(defaultProps.setFontColor).toHaveBeenCalledWith("#ff0000");
  });

  it("calls setTextPosition on text position select change", () => {
    render(<Form {...defaultProps} />);
    const dropdowns = screen.getAllByTestId("dropdown");
    const dropdown = dropdowns[0] as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: "flex-end" } });
    expect(defaultProps.setTextPosition).toHaveBeenCalledWith("flex-end");
  });

  it("displays error messages", () => {
    const errorProps = {
      ...defaultProps,
      errors: {
        background: { message: "Background is required" },
        bannerText: { message: "Banner Text is required" },
        fontSize: { message: "Font Size is required" },
        fontColor: { message: "Font Color is required" },
      },
    };
    render(<Form {...errorProps} />);
    expect(screen.getByText("Background is required")).toBeInTheDocument();
    expect(screen.getByText("Banner Text is required")).toBeInTheDocument();
    expect(screen.getByText("Font Size is required")).toBeInTheDocument();
    expect(screen.getByText("Font Color is required")).toBeInTheDocument();
  });
});
