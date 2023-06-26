import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTg5YmIzMWM0NDRkNzc3MjZhZmI0MWJiMzcyZTQxNiIsInN1YiI6IjY0NzQ0YmViY2MyNzdjMDBkYzRmNzgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QUyLk-rxK9y_iyti5CCy7i5lUGanYstmZFUb6Zpkdv0";

const headers = {
  authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
