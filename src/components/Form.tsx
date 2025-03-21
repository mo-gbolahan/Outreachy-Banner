import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type FormField = {
  background: string;
  bannerText: string;
  fontSize: string;
  fontColor: string;
  textPosition: string;
};

type FormProps = {
  onSubmit: SubmitHandler<FormField>;
  register: any;
  errors: any;
};

const Form: React.FC<FormProps> = ({ onSubmit, register, errors }) => {
  return (
    <form onSubmit={onSubmit} className="form">
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
      />
      {errors.bannerText && (
        <span className="error-message">{errors.bannerText.message}</span>
      )}

      <input
        {...register("fontSize", {})}
        placeholder="Font Size (e.g., 24px, 2rem)"
      />
      {errors.fontSize && (
        <span className="error-message">{errors.fontSize.message}</span>
      )}

      <input
        {...register("fontColor", {})}
        placeholder="Font Color (e.g., #000000, blue)"
      />
      {errors.fontColor && (
        <span className="error-message">{errors.fontColor.message}</span>
      )}

      <select {...register("textPosition", {})} defaultValue="center">
        <option value="flex-start">Top</option>
        <option value="center">Middle</option>
        <option value="flex-end">Bottom</option>
        <option value="flex-start flex-start">Top Left</option>
        <option value="flex-start flex-end">Top Right</option>
        <option value="center flex-start">Middle Left</option>
        <option value="center flex-end">Middle Right</option>
        <option value="flex-end flex-start">Bottom Left</option>
        <option value="flex-end flex-end">Bottom Right</option>
      </select>
    </form>
  );
};

export default Form;
