import { fetchTopRatedMovies, fetchTrendingMovies } from "@/actions/tmdb";
import { HomeHero } from "@/components/ui/Hero";
import { getMovies } from "@/lib/schemas/movies";

export default async function Home() {
  const [topRatedMovies] = await Promise.all([
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
  ]);
  const movies = await getMovies();
  const randomIndex = Math.floor(Math.random() * topRatedMovies.results.length);
  const topRatedMovie = topRatedMovies.results[randomIndex];

  console.log(movies);
  return (
    <>
      {/* @ts-expect-error TODO: fix this */}
      <HomeHero movie={topRatedMovie} />
      {/* <RecentlyAdded
        title="Recently Added"
        description="Top picks updated weekly."
      /> */}
    </>
  );
}
