import React from "react";

type BannerProps = {
  backgroundURL?: string;
  bannerBackground: string;
  bannerText: string;
  fontSize: string;
  fontColor: string;
  textPosition: string;
};

const Banner: React.FC<BannerProps> = ({
  backgroundURL,
  bannerBackground,
  bannerText,
  fontSize,
  fontColor,
  textPosition,
}) => {
  return (
    <div
      className="banner"
      data-testid="banner"
      style={{
        background: backgroundURL
          ? `url(${backgroundURL}) no-repeat center center/cover`
          : "#000000",
        justifyContent: textPosition.split(" ")[0],
        alignItems: textPosition.split(" ")[1] || "center",
      }}
    >
      <h1 data-testid="banner-text" style={{ fontSize, color: fontColor }}>
        {bannerText}
      </h1>
    </div>
  );
};

export default Banner;
