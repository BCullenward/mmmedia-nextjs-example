"use client";
import { searchMedia, getMedia } from "@/app/api/tmdb";
import { useEffect, useState } from "react";
import { updateMovie } from "@/app/db/media";

interface iMediaProps {
  mediaId: number;
  directoryName: string;
  mediaType: string;
}

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
  genres: string[];
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

export function MatchData({ mediaId, directoryName, mediaType }: iMediaProps) {
  const [mediaList, setMediaList] = useState<iTMDBSearchResponse[]>([]);
  const [mediaItem, setMediaItem] = useState<iTMDBResponse[]>([]);

  if (mediaList.length == 1) {
    //const data = updateMovie(mediaId, mediaList[0].id.toString());
  } else {
    //console.log(mediaList.length);
  }

  useEffect(() => {
    const fetchData = async () => {
      var mediaDetails: Promise<any>[] = [];

      const searchResults: iTMDBSearchResponse[] = await searchMedia(
        directoryName,
        mediaType
      );

      setMediaList(searchResults);
      if (searchResults.length == 1) {
        searchResults.map(async (row) => {
          mediaDetails.push(await getMedia(mediaId, row.id, mediaType));
          console.log(mediaDetails);
        });
        // const mediaDetails: iTMDBResponse[] = await Promise.all(
        //   searchResults.map((row) => {
        //     getMedia(mediaId, row.id, mediaType);
        //   })
        // );
        // setMediaItem(mediaDetails);
        // console.log(mediaItem);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>{directoryName}</h1>
      <div>
        Possible Matches:
        <br />
        <div className="grid">
          {mediaList.map((x, mediaId) => (
            <div key={mediaId} className="row-auto col-span-4">
              TMDBID: {x.id}
              Title: {x.title}
              Release Date: {x.release_date}
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
}
