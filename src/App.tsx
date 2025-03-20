import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./App.scss"; // Import the App.scss
import { useBackgroundPicture } from "./hooks/useBackgroundPicture"; // Import the useBackgroundPicture hook

type FormField = {
  background: string;
  bannerText: string;
  fontSize: string;
  fontColor: string;
};

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [bannerText, setBannerText] = useState("Banner Text");
  const [bannerBackground, setBannerBackground] = useState<string>();
  const [backgroundURL, setBackgroundURL] = useState<string>();
  const [fontSize, setFontSize] = useState<string>("24px");
  const [fontColor, setFontColor] = useState<string>("#000000");
  const {
    state,
    loading,
    error,
    setIsLoadingMore,
  }: {
    state: any;
    loading: boolean;
    error: any;
    setIsLoadingMore: (isLoading: boolean) => void;
  } = useBackgroundPicture(bannerBackground); // Use the useBackgroundPicture hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = (data) => {
    setBannerText(data.bannerText);
    setBannerBackground(data.background);
    setFontSize(data.fontSize);
    setFontColor(data.fontColor);
  };

  useEffect(() => {
    if (state.photos.length) {
      setBackgroundURL(state.photos[0].src.original);
    }
  }, [state]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <button onClick={toggleFormVisibility} className="toggle-button">
          <FontAwesomeIcon icon={isFormVisible ? faEyeSlash : faEye} />
        </button>
        {isFormVisible && (
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-group">
              <input
                {...register("background", {
                  required: "Background is required",
                })}
                placeholder="Text that best describe your banner background"
              />
              <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            {errors.background && (
              <span className="error-message">{errors.background.message}</span>
            )}

            <input
              {...register("bannerText", {
                required: "Banner Text is required",
              })}
              placeholder="Banner Text"
              onChange={(e) => setBannerText(e.target.value)}
            />
            {errors.bannerText && (
              <span className="error-message">{errors.bannerText.message}</span>
            )}

            <input
              {...register("fontSize", {})}
              placeholder="Font Size (e.g., 24px)"
              onChange={(e) => setFontSize(e.target.value)}
            />
            {errors.fontSize && (
              <span className="error-message">{errors.fontSize.message}</span>
            )}

            <input
              {...register("fontColor", {})}
              placeholder="Font Color (e.g., #000000)"
              onChange={(e) => setFontColor(e.target.value)}
            />
            {errors.fontColor && (
              <span className="error-message">{errors.fontColor.message}</span>
            )}
          </form>
        )}
      </div>
      <div
        className="banner"
        style={{
          background: backgroundURL
            ? `url(${backgroundURL}) no-repeat center center/cover`
            : bannerBackground,
        }}
      >
        <h1 style={{ fontSize, color: fontColor }}>{bannerText}</h1>
      </div>
    </div>
  );
};

export default App;
