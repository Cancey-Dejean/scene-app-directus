"use client";

import { Movie } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { movieYearFormat } from "@/utils/movieYearFormat";
import { imageBaseUrl } from "@/constants";
import Link from "next/link";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const moviesShown = 14;
  const [loadMore, setLoadMore] = useState(moviesShown);
  const showMoreMovies = () => {
    setLoadMore(loadMore + moviesShown);
  };

  // console.log(movies);
  return (
    <div>
      {movies && movies?.length > 0 ? (
        <ul className="grid grid-cols-1 gap-10 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {movies.slice(0, loadMore).map((movie, index) => (
            <li key={index}>
              <div className="group relative">
                <Image
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title ?? movie.original_title ?? ""}
                  width={180}
                  height={273}
                  className="mb-2 rounded-lg border border-white/10 transition-all duration-300 group-hover:scale-105"
                />
                <p className="font-semibold">{movie.title}</p>
                <p className="text-gray-400">
                  {movieYearFormat(movie.release_date ?? "")}
                </p>
                <Link
                  href={`/movies/${movie.id}`}
                  className="after:absolute after:inset-0"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-red-500">Movies coming soon.</h2>
      )}

      {movies && movies?.length > 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          {loadMore < movies?.length && (
            <Button onClick={showMoreMovies} variant="secondary">
              Load More
            </Button>
          )}

          {loadMore < movies?.length && (
            <p className="mt-8 flex justify-center text-white">
              Showing {loadMore} of {movies?.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
