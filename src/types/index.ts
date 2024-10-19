export type Movie = {
  id: number;
  title: string;
  description: string;
  banner: { id: string; title: string; filename_disk: string };
  slug: string;
  release_date: string;
  trailer_url: string;
  favorite_scenes: string[];
};
