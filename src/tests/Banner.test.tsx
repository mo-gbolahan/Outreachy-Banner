import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import Banner from "../components/Banner";

describe("Banner Component", () => {
  const defaultProps = {
    backgroundURL: "https://example.com/image.jpg",
    bannerBackground: "blue",
    bannerText: "Test Banner",
    fontSize: "2rem",
    fontColor: "#ffffff",
    textPosition: "center",
  };

  it("renders the banner text", () => {
    render(<Banner {...defaultProps} />);
    const bannerText = screen.getByText("Test Banner");
    expect(bannerText).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    render(<Banner {...defaultProps} />);
    const banner = screen.getByText("Test Banner").parentElement;
    expect(banner).toHaveStyle({
      background: `url(${defaultProps.backgroundURL}) no-repeat center center/cover`,
      justifyContent: "center",
      alignItems: "center",
    });
    expect(banner?.querySelector("h1")).toHaveStyle({
      fontSize: defaultProps.fontSize,
      color: defaultProps.fontColor,
    });
  });

  it("renders with default background if no backgroundURL is provided", () => {
    const propsWithoutBackgroundURL = {
      ...defaultProps,
      backgroundURL: undefined,
    };
    render(<Banner {...propsWithoutBackgroundURL} />);
    const banner = screen.getByText("Test Banner").parentElement;
    expect(banner).toHaveStyle({
      background: defaultProps.bannerBackground,
    });
  });
});
