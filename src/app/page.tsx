import { fetchTopRatedMovies, fetchTrendingMovies } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import { HomeHero } from "@/components/ui/Heroes/HomeHero";
import { MovieRow } from "@/components/ui/Movies/MovieRow";
import { TopFiveFeatured } from "@/components/ui/TopFiveFeatured";
import { getMovies } from "@/lib/schemas/movies";
import { Suspense } from "react";

export default async function Home() {
  const [
    trendingMovies,
    topRatedMovies,
    // movies
  ] = await Promise.all([
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
    getMovies(),
  ]);

  const randomIndex = Math.floor(Math.random() * topRatedMovies.results.length);
  const topRatedMovie = topRatedMovies.results[randomIndex];

  // console.log(movies);
  return (
    <>
      <Suspense>
        <HomeHero movie={topRatedMovie} />
      </Suspense>

      <Suspense>
        <section className="relative z-10 mt-[-130px]">
          <Container>
            <MovieRow movies={trendingMovies.results} title="Trending Now" />
          </Container>
        </section>
      </Suspense>

      <TopFiveFeatured className="py-28" />
    </>
  );
}
