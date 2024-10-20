export type Genre = {
  categories_id: {
    title: string;
    slug: string;
  };
};

export type FavoriteScene = {
  title: string;
  description: string;
  image: string;
  scene_start: number;
  scene_end: number;
  scene_url: string;
};

export type Movie = {
  id: number;
  title: string;
  description: string;
  synopsis: string;
  banner: { id: string; title: string; filename_disk: string };
  slug: string;
  genres: Genre[];
  release_date: string;
  trailer_url: string;
  favorite_scenes: FavoriteScene[];
};
