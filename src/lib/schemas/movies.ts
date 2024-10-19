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
        "slug",
        "synopsis",
        "release_date",
        "genre",
        "trailer_url",
        "favorite_scenes",
      ],
    }),
  );
}
