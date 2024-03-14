"use client";

import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal";

interface iAppProps {
  id: number;
  title: string;
  overview: string;
  youtubeUrl: string;
  releaseYear: number;
  age: number;
  duration: number;
}

export default function MovieButtons({
  id,
  title,
  overview,
  youtubeUrl,
  releaseYear,
  age,
  duration,
}: iAppProps) {
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
      <PlayVideoModal
        state={open}
        changeState={setOpen}
        key={id}
        title={title}
        overview={overview}
        youtubeUrl={youtubeUrl}
        release={releaseYear}
        age={age}
        duration={duration}
      />
    </>
  );
}
