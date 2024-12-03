import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export async function getTvShows() {
  return directus.request(
    readItems("tvShows", {
      fields: [
        // "*",
        "date_created",
        "title",
        "showId",
        "has_seen_show",
      ],
      sort: ["-date_created"],
    }),
  );
}
