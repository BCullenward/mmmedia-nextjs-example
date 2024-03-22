import axios from "axios";
import { updateMovie } from "@/app/db/media";

const key = process.env.NEXT_PUBLIC_TMDB_API;

const baseUrl = "https://api.themoviedb.org/3";
const movieUrl = "/movie";
const showUrl = "/tv";

interface iTMDBSearchResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface iTMDBResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: iGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: string[];
  production_countries: string[];
  release_date: string;
  release_dates: iCertification[];
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface iGenre {
  id: number;
  name: string;
}

interface iCertification {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    descriptors: string[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  }[];
}

export async function searchForSpecificMedia(
  filename: string,
  mediaType: string
) {
  var yr = getYearFromFileName(filename).trim();
  var searchPhrase = filename.replace(yr, "").replace("(", "").replace(")", "");
  //var searchPhrase = removeYear(filename).trim();
  searchPhrase = searchPhrase.split(" ").join("+");
  var apiURL =
    `${baseUrl}` +
    "/search" +
    (mediaType == "shows" ? `${showUrl}` : `${movieUrl}`) +
    "?api_key=" +
    key +
    "&query=" +
    searchPhrase +
    (yr.length == 4 ? "&primary_release_year=" + yr : "") +
    "&region=US";

  const response = await axios.get(apiURL);
  const movies: iTMDBSearchResponse[] = response.data.results;

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
  const movie: iTMDBResponse = await response.data;

  return movie;
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

export default searchForSpecificMedia;
