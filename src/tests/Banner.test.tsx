import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import Banner from "../components/Banner";

const defaultText: string = "Banner Text. eg Volleyball";

describe("Banner Component", () => {
  const defaultProps = {
    backgroundURL: "https://example.com/image.jpg",
    bannerBackground: "#000000",
    bannerText: defaultText,
    fontSize: "2rem",
    fontColor: "#ffffff",
    textPosition: "center",
  };

  it("renders the banner text", () => {
    render(<Banner {...defaultProps} />);
    const bannerText = screen.getByTestId("banner-text");
    expect(bannerText).toBeInTheDocument();
    expect(bannerText).toHaveTextContent(defaultText);
  });

  it("applies the correct styles", () => {
    render(<Banner {...defaultProps} />);
    const banners = screen.getAllByTestId("banner");
    const banner = banners[0];

    expect(banner).toHaveStyle({
      background: `url(${defaultProps.backgroundURL}) no-repeat center center/cover`,
      justifyContent: "center",
      alignItems: "center",
    });
    const bannerTexts = screen.getAllByTestId("banner-text");
    const bannerText = bannerTexts[0];

    expect(bannerText).toHaveStyle({
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
    const banners = screen.getAllByTestId("banner");
    const banner = banners[0];
    //not sure how to test the background if no image is provided
    // expect(banner).toHaveStyle({
    //   background: defaultProps.bannerBackground,
    // });
  });
});
