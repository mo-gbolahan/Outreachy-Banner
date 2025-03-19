import { useForm, SubmitHandler } from "react-hook-form";
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

  const onSubmit: SubmitHandler<FormField> = (data) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      {" "}
      {/* Add the form-container class */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("background", { required: "Background is required" })}
          placeholder="Background"
        />
        {errors.background && (
          <span className="error-message">{errors.background.message}</span>
        )}

        <input
          {...register("bannerText", { required: "Banner Text is required" })}
          placeholder="Banner Text"
        />
        {errors.bannerText && (
          <span className="error-message">{errors.bannerText.message}</span>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
