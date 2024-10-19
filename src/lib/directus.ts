import { createDirectus, rest } from "@directus/sdk";

// Client with REST support
export const directus = createDirectus(
  String(process.env.DIRECTUS_API_ENDPOINT),
).with(rest());
