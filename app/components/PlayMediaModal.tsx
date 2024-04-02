import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { iMediaStateProps } from "@/app/interfaces/databaseInterfaces";

export default function PlayMediaModal({
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
  state,
  changeState,
}: iMediaStateProps) {
  return (
    <Dialog open={state} onOpenChange={() => changeState(!state)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {tagline}
          <DialogDescription className="line-clamp-3">
            {overview}
          </DialogDescription>
          <div className="flex gap-x-2 items-center">
            <p>{releasedate}</p>
            <p className="certification">{certification}</p>
            <p>{runtime}m</p>
          </div>
        </DialogHeader>
        {/* {trailerURL} */}
        <iframe src={trailerURL} height={250} className="w-full"></iframe>
      </DialogContent>
    </Dialog>
  );
}
