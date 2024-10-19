import { createDirectus, rest } from "@directus/sdk";

export type ItemsQuery = {
  limit?: number;
  fields?: Array<string>;
  filter?: Record<
    string,
    {
      _eq: string | number;
    }
  >;
};
// Client with REST support
export const directus = createDirectus(
  String(process.env.DIRECTUS_API_ENDPOINT),
).with(rest());
