import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export async function getMovies() {
  return directus.request(
    readItems("movies", {
      fields: [
        "title",
        // "banner.*",
        "banner.id",
        "banner.title",
        "banner.filename_disk",
        "slug",
        "synopsis",
        "release_date",

        "trailer_url",
        "favorite_scenes",
      ],
    }),
  );
}
