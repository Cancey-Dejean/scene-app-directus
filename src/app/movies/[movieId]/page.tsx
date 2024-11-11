import { fetchMoviesByIds } from "@/actions/tmdb";
import { MovieDetail } from "@/components/ui/Movies/MovieDetail";

type Props = {
  params: Promise<{ movieId: string }>;
};
export default async function MovieDetailsPage(props: Props) {
  const { movieId } = await props.params;
  const movieDetails = await fetchMoviesByIds([movieId]);

  const movie = movieDetails[0];

  // console.log(movieDetails);

  return (
    <>
      {/* @ts-expect-error TODO: fix this */}
      <MovieDetail details={movie} />
    </>
  );
}
