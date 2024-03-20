"use server";
import prisma from "@/app/utils/db";

interface iTMDBSearchProps {
  id: number;
  directoryName: string;
  mediaType: string;
}

export async function getData(numRows: number) {
  const data: iTMDBSearchProps[] = await prisma.$queryRaw`
          select max("id") as id, "directoryName", "mediaType"
          from "Media"
          where "tmdbID" is null
          group by "directoryName", "mediaType"
          limit (${numRows})
        `;

  return data;
}

export async function updateMovie(
  mediaId: number,
  tmdbId: string,
  imdb_id: string
) {
  "use server";
  const data = await prisma.media.update({
    where: { id: mediaId },
    data: {
      tmdbID: tmdbId,
      imdbID: imdb_id,
    },
  });
  return data;
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
