import { directus } from "@/lib/directus";
import { aggregate, readItem, readItems } from "@directus/sdk";

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
      limit: 3000,
    }),
  );
}

export async function getTotalMovieCount() {
  const totalCount = await directus.request(
    aggregate("movies", {
      aggregate: { count: "*" },
    }),
  );
  return totalCount[0].count;
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
        {
          topComedy: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topAction: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topDrama: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topDocumentary: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topMartialArts: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topChristmas: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topHorror: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topThriller: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topHood: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topMobb: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topSciFi: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          top80s: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topPostApocalyptic: [
            "*",
            {
              movies_id: ["movieId"],
            },
          ],
        },
        {
          topWars: [
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

export async function fetchMoviesForPagination({
  limit,
  page,
}: {
  limit: string;
  page: string;
}) {
  return await directus.request(
    readItems("movies", {
      fields: [
        "date_created",
        "title",
        "movieId",
        "banner_alt.filename_disk",
        "has_seen_movie",
      ],
      limit: parseInt(limit),
      page: parseInt(page),
      sort: ["-date_created"],
    }),
  );
}
