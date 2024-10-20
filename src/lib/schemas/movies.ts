import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export async function getMovies() {
  return directus.request(
    readItems("movies", {
      fields: [
        "*",
        "banner.*",
        "poster.*",
        "favorite_scenes.*",
        "genres.*.title",
        "genres.*.slug",
      ],
    }),
  );
}
