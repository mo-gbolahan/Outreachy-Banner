import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./App.scss"; // Import the App.scss
import { useBackgroundPicture } from "./hooks/useBackgroundPicture"; // Import the useBackgroundPicture hook
import Banner from "./components/Banner"; // Import the Banner component
import Form from "./components/Form"; // Import the Form component

type FormField = {
  background: string;
  bannerText: string;
  fontSize: string;
  fontColor: string;
  textPosition: string;
};

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [bannerText, setBannerText] = useState("Banner Text e.g. Volleyball");
  const [bannerBackground, setBannerBackground] =
    useState<string>("volleyball");
  const [backgroundURL, setBackgroundURL] = useState<string>();
  const [fontSize, setFontSize] = useState<string>("5rem");
  const [fontColor, setFontColor] = useState<string>("#b3b3b3");
  const [textPosition, setTextPosition] = useState<string>("center");
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
    setBannerBackground(data.background);
  };
  const initialRender = useRef(true);
  useEffect(() => {
    if (state.photos.length) {
      // setBackgroundURL();
    }
  }, [state]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="app-container">
      <div className={`form-container ${isFormVisible ? "visible" : "hidden"}`}>
        <button onClick={toggleFormVisibility} className="toggle-button">
          <FontAwesomeIcon icon={isFormVisible ? faEyeSlash : faEye} />
        </button>
        {isFormVisible && (
          <Form
            register={register}
            errors={errors}
            handleSubmit={handleSubmit(onSubmit)}
            setBannerText={setBannerText}
            setFontSize={setFontSize}
            setFontColor={setFontColor}
            setTextPosition={setTextPosition}
          />
        )}
      </div>
      <Banner
        backgroundURL={backgroundURL}
        bannerBackground={bannerBackground}
        bannerText={bannerText}
        fontSize={fontSize}
        fontColor={fontColor}
        textPosition={textPosition}
      />
    </div>
  );
};

export default App;
