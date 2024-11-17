import { directus } from "@/lib/directus";
import { readItem, readItems } from "@directus/sdk";

export async function getMovies() {
  return directus.request(
    readItems("movies", {
      fields: [
        // "*",
        "date_created",
        "title",
        "movieId",
        "banner_alt.filename_disk",
        "has_seen_movie",
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
      sort: ["-date_created"],
    }),
  );
}

export async function getMovieById(movieId: string) {
  return directus.request(readItem("movies", movieId));
}

export async function getFavorites() {
  return directus.request(
    readItems("favorites", {
      fields: [
        "*",
        {
          top5: [
            "*",

            {
              movies_id: ["movieId"],
            },
          ],
        },

        // {
        //   quotes: [
        //     "*",
        //     "text",
        //     "characterName",
        //     "imgUrl.*",
        //     "imgUrl.filename_disk",
        //   ],
        // },
      ],
    }),
  );
}
