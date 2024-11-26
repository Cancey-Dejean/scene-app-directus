import { fetchMoviesByIds } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import HeroBanner from "@/components/ui/Heroes/HeroBanner";
import MovieList from "@/components/ui/Movies/MovieList";
import { getMovies } from "@/lib/schemas/movies";

import React, { Suspense } from "react";

export const revalidate = 0;

export default async function MoviesPage() {
  const movies = await getMovies();

  const allMovies = await fetchMoviesByIds(
    movies.map((movie: { movieId?: string | null }) => String(movie.movieId)),
  );

  // console.log(allMovies);
  return (
    <>
      <Suspense>
        <HeroBanner movie={allMovies} />
      </Suspense>

      <Suspense>
        <section className="bg-black py-40">
          <Container>
            <MovieList movies={allMovies} />

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
