import { directus } from "@/lib/directus";
import { readItem, readItems } from "@directus/sdk";

export async function getMovies() {
  return directus.request(
    readItems("movies", {
      fields: [
        // "*",
        "title",
        "movieId",
        {
          scenes: [
            "title",
            "scene_starts",
            "scene_ends",
            "scene_img.*",
            "scene_img.filename_disk",
          ],
        },
        {
          quotes: [
            "*",
            "text",
            "characterName",
            "imgUrl.*",
            "imgUrl.filename_disk",
          ],
        },
      ],
      sort: ["title"],
    }),
  );
}

export async function getMovieById(movieId: string) {
  return directus.request(readItem("movies", movieId));
}
