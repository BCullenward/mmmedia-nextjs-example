import axios from "axios";
import { updateMovie } from "../db/media";

const key = process.env.NEXT_PUBLIC_TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieUrl = "/movie";
const showUrl = "/tv";

export async function searchMedia(filename: string, mediaType: string) {
  var yr = getYearFromFileName(filename).trim();
  var searchPhrase = removeYear(filename).trim();
  searchPhrase = searchPhrase.split(" ").join("+");
  var apiURL =
    `${baseUrl}` +
    "/search" +
    (mediaType == "shows" ? `${showUrl}` : `${movieUrl}`) +
    "?api_key=" +
    key +
    "&query=" +
    searchPhrase +
    (yr.length == 4 ? "&primary_release_year=" + yr : "");

  const response = await axios.get(apiURL);
  const movies = response.data.results;

  return movies;
}

export async function getMedia(
  mediaId: number,
  tmdbId: number,
  mediaType: string
) {
  var apiURL =
    `${baseUrl}` +
    (mediaType == "shows" ? `${showUrl}` : `${movieUrl}`) +
    "/" +
    `${tmdbId}` +
    "?api_key=" +
    key +
    "&append_to_response=release_dates";

  const response = await axios.get(apiURL);
  //const movie = response.data;

  // new testing code
  const movie = await response.data;
  //      movie.forEach((item) => {
  //        console.log("backdrop path" + item.backdrop_path);
  //      });

  // end new testing code
  //   console.log("Length for " + movie.title + " is " + movie.length);
  //   console.log(movie.adult + " " + movie.backdrop_path);

  //   updateMovie(mediaId, movie.id, movie.imdb_id);

  //   console.log(movie);

  return movie;
}

export function removeYear(filename: string) {
  var res = filename;

  if (filename.length > 6) {
    var yr = filename.substring(filename.length - 6);

    if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
      res = filename.split(yr).join("");
    }
  }

  return res;
}

export function getYearFromFileName(filename: string) {
  var yr = "";

  if (filename.length > 6) {
    yr = filename.substring(filename.length - 6);
    if (yr.substring(yr.length - 1) == ")" && yr.substring(0, 1) == "(") {
      yr = yr.split("(").join("");
      yr = yr.split(")").join("");
    }
  }
  return yr;
}

export default searchMedia;
