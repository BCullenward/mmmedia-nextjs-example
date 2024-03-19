"use client";
import { searchMedia } from "@/app/api/tmdb";
import { useEffect, useState } from "react";
import { updateMovie } from "@/app/db/media";

interface iMediaProps {
  mediaId: number;
  directoryName: string;
  mediaType: string;
}

interface iTMDBResponse {
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

export function MatchData({ mediaId, directoryName, mediaType }: iMediaProps) {
  const [mediaList, setMediaList] = useState<iTMDBResponse[]>([]);

  if (mediaList.length == 1) {
    console.log("has one");
    //const data = updateMovie(mediaId, mediaList[0].id.toString());
    // imdbID String?
    // tmdbID String?
    // title String?
    // original_title String?
    // overview String?
    // release_date DateTime?
    // poster_path String?
    // backdrop_path String?
    // tagline String?
    // runtime Float?
    // adult Boolean?
    // genre String[]
    // collection_name String?
    // certification String?
    // trailerURL String?
  } else {
    console.log(mediaList.length);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data: iTMDBResponse[] = await searchMedia(directoryName, mediaType);
      setMediaList(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>In Match Data with {directoryName}</h1>
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
