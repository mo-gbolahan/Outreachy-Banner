// Configuration for Pexels API

const API_URL = "https://api.pexels.com/v1/";
const API_KEY =
  import.meta.env.VITE_API_KEY ||
  " IIgzPspnp3LvB15Pm5f0AuvciF0YLoEnH2kTX9gSYWV14dSQClzkYE9S";

const backgroundPicture = `${API_URL}search?query=`;
const alternateBackgroundPicture = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;

// Sizes: large, medium, small, original
const backgroundPictureSize = "large";
// Sizes: large, medium, small, original
const posterSize = "small";

export {
  backgroundPicture,
  alternateBackgroundPicture,
  API_URL,
  API_KEY,
  backgroundPictureSize,
  posterSize,
};
