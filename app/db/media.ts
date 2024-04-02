"use server";
import prisma from "@/app/utils/db";
import { iTMDBSearchProps } from "@/app/interfaces/TMDBInterfaces";
import { iMedia } from "../interfaces/databaseInterfaces";

export async function getData(numRows: number) {
  const data: iTMDBSearchProps[] = await prisma.$queryRaw`
          select max("id") as id, "directoryName", "mediaType"
          from "Media"
          where "tmdbID" is null
            and "mediaType" = 'movies'
          group by "directoryName", "mediaType"
          limit (${numRows})
        `;

  return data;
}

export async function getRandomRecord() {
  const data: iMedia[] = await prisma.$queryRaw`
  select
    "id",
    "imdbID",
    "tmdbID",
    "title",
    "original_title",
    "overview",
    cast(cast("release_date" as date) as varchar) as releasedate,
    "poster_path",
    "backdrop_path",
    "tagline",
    "runtime",
    "adult",
    "genre",
    "collection_name",
    "certification",
    "trailerURL",
    "directoryName"
  from "Media"
  where "tmdbID" is not null 
    and "tmdbID" <> '0'    
    and "mediaType" = 'movies'      
  order by random()
  limit 1
`;
  return data;
}

export async function updateMovie(
  mediaId: number,
  tmdbId: string,
  imdb_id: string,
  title: string,
  original_title: string,
  overview: string,
  release_date: string,
  poster_path: string,
  backdrop_path: string,
  tagline: string,
  runtime: number,
  adult: boolean,
  genre: string,
  collection_name: string,
  certification: string,
  trailerURL: string
) {
  "use server";

  const data = await prisma.media.update({
    where: { id: mediaId },
    data: {
      tmdbID: tmdbId,
      imdbID: imdb_id,
      title: title,
      original_title: original_title,
      overview: overview,
      release_date: new Date(release_date),
      poster_path: poster_path
        ? "https://image.tmdb.org/t/p/original" + poster_path
        : null,
      backdrop_path: backdrop_path
        ? "https://image.tmdb.org/t/p/original" + backdrop_path
        : null,
      tagline: tagline,
      runtime: runtime,
      adult: adult,
      genre: genre,
      collection_name: collection_name,
      certification: certification,
      trailerURL: trailerURL,
    },
  });
  return data;
  //return "";
}

// export async function addToWatchlist(formData: FormData) {
//   "use server";

//   const movieId = formData.get("movieId");
//   const pathName = formData.get("pathname") as string;
//   const session = await getServerSession(authOptions);

//   const data = await prisma.watchList.create({
//     data: {
//       userId: session?.user?.email as string,
//       movieId: Number(movieId),
//     },
//   });
//   revalidatePath(pathName);
// }
