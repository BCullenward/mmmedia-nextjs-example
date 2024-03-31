export interface iMediaProps {
  mediaId: number;
  directoryName: string;
  mediaType: string;
}

export interface iTMDBSearchResponse {
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

export interface iTMDBResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: iCollection;
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
  release_dates: iCertification;
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: iVideo;
  vote_average: number;
  vote_count: number;
}

export interface iGenre {
  id: number;
  name: string;
}

export interface iCertification {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: string[];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
}

export interface iVideo {
  results: {
    id: string;
    iso_639_1: "en";
    iso_3166_1: "US";
    key: string;
    name: string;
    official: false;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
}

export interface iCollection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export interface iTMDBSearchProps {
  id: number;
  directoryName: string;
  mediaType: string;
}
