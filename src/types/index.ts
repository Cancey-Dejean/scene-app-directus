// export type Genre = {
//   categories_id: {
//     title: string;
//     slug: string;
//   };
// };

// export type FavoriteScene = {
//   title: string;
//   description: string;
//   image: string;
//   scene_start: number;
//   scene_end: number;
//   scene_url: string;
// };

// export type Movie = {
//   id: number;
//   title: string;
//   description: string;
//   synopsis: string;
//   banner: { id: string; title: string; filename_disk: string };
//   slug: string;
//   genres: Genre[];
//   release_date: string;
//   trailer_url: string;
//   favorite_scenes: FavoriteScene[];
// };

export type Movie = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  homepage?: string | null;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  similar?: {
    results: Array<{
      id: number;
      title?: string;
      name?: string;
      poster_path: string | null;
    }>;
  };
  quotes?: Array<{
    text: string;
    characterName: string;
    imgUrl: string;
  }>;
  scenes?: Array<{
    title: string;
    sceneStarts: string;
    sceneEnds: string;
    imgUrl: string;
  }>;
};

export type MovieDetail = Movie & {
  genres: Array<{ id: number; name: string }>;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  runtime?: number;
  number_of_seasons?: number;
  tagline?: string;
};

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  // results: Movie[];
};

export type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
};

export class TMDBError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "TMDBError";
  }
}
