import MediaVideo from "../components/MediaVideo";
import Mediabar from "../components/Mediabar";
//import MovieVideo from "../components/MovieVideo";

export default function HomePage() {
  return (
    <div className="p-5 lg:p-0">
      {/* <MovieVideo /> */}
      <MediaVideo />
      <h1 className="text-3xl font-nsans-bold">Recently Added</h1>
      <Mediabar />
    </div>
  );
}
