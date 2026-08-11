const API_KEY = "58f0e4b0";
const BASE_URL = "http://www.omdbapi.com/";

export const getPopularMovies = async (searchTerm = "Action") => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&type=movie`,
  );
  const data = await response.json();
  return data.Search || [];
};

export const searchMovies = async (title) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${title}`);
  const data = await response.json();
  return data.Search || [];
};
