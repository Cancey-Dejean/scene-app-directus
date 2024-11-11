import { fetchMoviesByIds } from "@/actions/tmdb";
import FavoriteScenes from "@/components/ui/Movies/FavoriteScenes";
import { MovieDetail } from "@/components/ui/Movies/MovieDetail";
import { getMovies } from "@/lib/schemas/movies";

type Props = {
  params: Promise<{ movieId: string }>;
};
export default async function MovieDetailsPage(props: Props) {
  const { movieId } = await props.params;
  // const movieDetails = await fetchMoviesByIds([movieId]);

  const [tmdbMovieDetails, cmsMovies] = await Promise.all([
    fetchMoviesByIds([movieId]),
    getMovies(),
  ]);

  const tmdbMovie = tmdbMovieDetails[0];
  const movie = cmsMovies.find((movie) => movie.movieId === movieId);

  console.log(movie?.scenes[0]);

  return (
    <>
      {/* @ts-expect-error TODO: fix this */}
      <MovieDetail details={tmdbMovie} />

      {/* @ts-expect-error TODO: fix this */}
      <FavoriteScenes movie={movie} />
    </>
  );
}
