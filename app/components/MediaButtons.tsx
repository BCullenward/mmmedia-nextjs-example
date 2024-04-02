"use client";
import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";
import { useState } from "react";
import PlayMediaModal from "./PlayMediaModal";
import { iMediaProps } from "@/app/interfaces/databaseInterfaces";

export default function MediaButtons({
  id,
  title,
  original_title,
  overview,
  releasedate,
  poster_path,
  backdrop_path,
  tagline,
  runtime,
  adult,
  genre,
  collection_name,
  certification,
  trailerURL,
}: iMediaProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" /> Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="mr-2 h-6 w-6" /> Learn More
      </Button>
      <PlayMediaModal
        state={open}
        changeState={setOpen}
        key={id}
        title={title}
        overview={overview}
        trailerURL={trailerURL}
        releasedate={releasedate}
        certification={certification}
        runtime={runtime}
        id={id}
        original_title={original_title}
        poster_path={poster_path}
        backdrop_path={backdrop_path}
        tagline={tagline}
        adult={adult}
        genre={genre}
        collection_name={collection_name}
      />
    </>
  );
}
