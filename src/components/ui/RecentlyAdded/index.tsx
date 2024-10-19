import Link from "next/link";

import { Button } from "@/components/ui/Button";

import { getMovies } from "@/lib/schemas/movies";
import { Movie } from "@/types";
import MovieCard from "@/components/ui/Card/MovieCard";

export default async function RecentlyAdded({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const movies = await getMovies();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="max-w-7xl text-xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl">
            {title}
          </h1>
          <Button variant="default" asChild>
            <Link href="/movies">View All</Link>
          </Button>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.title} movie={movie as Movie} />
          ))}
        </div>
      )}
    </div>
  );
}
