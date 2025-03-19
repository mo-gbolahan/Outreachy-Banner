import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./App.scss"; // Import the App.scss file
//components

type FormField = {
  background: string;
  bannerText: string;
};

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [bannerText, setBannerText] = useState("Banner Text");
  const [bannerBackground, setBannerBackground] = useState("white");

  const onSubmit: SubmitHandler<FormField> = (data) => {
    setBannerText(data.bannerText);
    setBannerBackground(data.background);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("background", {
                required: "Background is required",
              })}
              placeholder="Background"
            />
            {errors.background && (
              <span className="error-message">{errors.background.message}</span>
            )}

            <input
              {...register("bannerText", {
                required: "Banner Text is required",
              })}
              placeholder="Banner Text"
            />
            {errors.bannerText && (
              <span className="error-message">{errors.bannerText.message}</span>
            )}

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <div className="banner" style={{ background: bannerBackground }}>
        <h1>{bannerText}</h1>
      </div>
    </div>
  );
};

export default App;
