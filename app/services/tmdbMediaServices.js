import axios from "axios";
//const fetch = require("node-fetch");

const key = process.env.TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieSearchUrl = baseUrl + "/search/movie";
const showSearchUrl = baseUrl + "/search/tv";

// interface iTMDBResponse {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: string[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

export async function searchMedia(filename, mediaType) {
  var searchPhrase = removeYear(filename).trim();
  searchPhrase = searchPhrase.split(" ").join("+");
  var apiURL = mediaType == "shows" ? `${showSearchUrl}` : `${movieSearchUrl}`;
  apiURL = apiURL + "?api_key=" + key + "&query=" + searchPhrase;
  var movies = [];
  await axios.get(apiURL).then((response) => (movies = response.data.results));

  //console.log(movies);

  return movies;
}

export function removeYear(filename) {
  var res = filename;

  if (filename.length > 6) {
    var yr = filename.substring(filename.length - 6);

    if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
      res = filename.split(yr).join("");
    }
  }

  return res;
}

const ml = [];
export default searchMedia;
