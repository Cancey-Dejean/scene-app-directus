import { fetchMoviesByIds } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import { FocusCards } from "@/components/ui/focus-cards";
import HeroBanner from "@/components/ui/Heroes/HeroBanner";
import { getMovies } from "@/lib/schemas/movies";

import React, { Suspense } from "react";

export default async function MoviesPage() {
  const movies = await getMovies();

  const allMovies = await fetchMoviesByIds(
    movies.map((movie: { movieId?: string | null }) => String(movie.movieId)),
  );

  // console.log(movies);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroBanner movie={allMovies} />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900" />}>
        <section className="bg-black py-40">
          <Container className="">
            <div className="grid grid-cols-1 gap-6 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <FocusCards cards={allMovies} />
            </div>

            {movies.length === 0 && (
              <p className="text-center text-lg text-gray-400">
                No movies found
              </p>
            )}
          </Container>
        </section>
      </Suspense>
    </>
  );
}
