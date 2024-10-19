import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export async function getMovies() {
  return directus.request(
    readItems("movies", {
      fields: [
        "*",
        "slug",
        "title",
        "banner.id",
        "banner.title",
        "banner.filename_disk",
        "synopsis",
        "release_date",
        "favorite_scenes",
        "trailer_url",
        // "category.*",
      ],
    }),
  );
}
