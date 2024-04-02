export interface iMedia {
  id: number;
  imdbID: string;
  tmdbID: string;
  title: string;
  original_title: string;
  overview: string;
  releasedate: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  runtime: number;
  adult: boolean;
  genre: string;
  collection_name: string;
  certification: string;
  trailerURL: string;
  directoryName: string;
}

export interface iMediaProps {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  releasedate: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  runtime: number;
  adult: boolean;
  genre: string;
  collection_name: string;
  certification: string;
  trailerURL: string;
}

export interface iMediaStateProps {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  releasedate: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  runtime: number;
  adult: boolean;
  genre: string;
  collection_name: string;
  certification: string;
  trailerURL: string;
  state: boolean;
  changeState: any;
}
