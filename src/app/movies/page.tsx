// import { fetchById } from "@/actions/tmdb";
// import { getMovieById } from "@/lib/schemas/movies";

// type Props = {
//   params: Promise<{ movieId: string }>;
// };

// export default async function MoviesPage({ params }: Props) {
//   const { movieId } = await params;

//   const [movieDetails, movie] = await Promise.all([
//     fetchById(movieId, "movie"),
//     getMovieById(movieId),
//   ]);

//   console.log(movie);
//   return <div>page</div>;
// }

import { fetchMoviesByIds } from "@/actions/tmdb";
import HeroBanner from "@/components/ui/Heroes/HeroBanner";
import { getMovies } from "@/lib/schemas/movies";

import React, { Suspense } from "react";

export default async function MoviesPage() {
  const movies = await getMovies();

  const allMovies = await fetchMoviesByIds(
    movies.map((movie: { movieId?: string | null }) => String(movie.movieId)),
  );

  console.log(allMovies);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error TODO: fix this soon */}
        <HeroBanner movie={allMovies} />
      </Suspense>
    </>
  );
}
