import { useState, useEffect } from "react";

const API_URL = "https://api.pexels.com/v1/search";
const API_KEY = import.meta.env.VITE_API_KEY;

// Initial State
const initialState = {
  page: 0,
  photos: [],
};

export const useBackgroundPicture = (q = "") => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchBackgroundPicture = async (searchQuery = q, page = 1) => {
    if (!searchQuery) return; // Ensure searchQuery is not empty

    try {
      setError(false);
      setLoading(true);

      const response = await fetch(
        `${API_URL}?query=${searchQuery}&page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const data = await response.json();

      setState(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render and search
  useEffect(() => {
    fetchBackgroundPicture(q);
  }, [q]);

  // Load more
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchBackgroundPicture(q, state.page + 1);
    setIsLoadingMore(false);
  }, [isLoadingMore, q, state.page]);

  return {
    state,
    loading,
    error,

    setIsLoadingMore,
  };
};
