import { directus } from "@/lib/directus";
import { readItem, readItems } from "@directus/sdk";

export async function getMovies() {
  return directus.request(
    readItems("movies", {
      fields: [
        // "*",
        "title",
        "movieId",
        "favorite_scenes.*",
      ],
      sort: ["title"],
    }),
  );
}

export async function getMovieById(movieId: string) {
  return directus.request(readItem("movies", movieId));
}
