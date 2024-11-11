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
    }),
  );
}
