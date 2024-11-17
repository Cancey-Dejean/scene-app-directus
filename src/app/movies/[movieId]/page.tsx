import { fetchMoviesByIds } from "@/actions/tmdb";
import FavoriteScenes from "@/components/ui/Movies/FavoriteScenes";
import { MovieDetail } from "@/components/ui/Movies/MovieDetail";
import FavoriteQuotes from "@/components/ui/Movies/Quotes";
import { getMovies } from "@/lib/schemas/movies";
import { Suspense } from "react";

type Props = {
  params: Promise<{ movieId: string }>;
};

export default async function MovieDetailsPage(props: Props) {
  const { movieId } = await props.params;
  // const { movieId } = props.params;

  const [tmdbMovieDetails, cmsMovies] = await Promise.all([
    fetchMoviesByIds([movieId]),
    getMovies(),
  ]);

  const tmdbMovie = tmdbMovieDetails[0];
  const movie = cmsMovies.find((movie) => movie.movieId === movieId);

  // console.log(movie);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error TODO: fix this */}
        <MovieDetail movie={movie} details={tmdbMovie} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error TODO: fix this */}
        <FavoriteScenes movie={movie} />
      </Suspense>

      {movie?.quotes?.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          {/* @ts-expect-error TODO: fix this */}
          <FavoriteQuotes movie={movie} />
        </Suspense>
      )}
    </>
  );
}
