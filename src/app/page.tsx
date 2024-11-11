import { fetchTopRatedMovies, fetchTrendingMovies } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import { HomeHero } from "@/components/ui/HomeHero";
import HomeHeroSkeleton from "@/components/ui/HomeHero/HomeHeroSkeleton";
import { MovieRow } from "@/components/ui/Movies/MovieRow";
import { TopFiveFeatured } from "@/components/ui/TopFiveFeatured";
import { getMovies } from "@/lib/schemas/movies";
import { Suspense } from "react";

export default async function Home() {
  const [trendingMovies, topRatedMovies] = await Promise.all([
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
  ]);
  const movies = await getMovies();
  const randomIndex = Math.floor(Math.random() * topRatedMovies.results.length);
  const topRatedMovie = topRatedMovies.results[randomIndex];

  console.log(topRatedMovie);
  return (
    <>
      <Suspense fallback={<HomeHeroSkeleton />}>
        {/* @ts-expect-error TODO: fix this */}
        <HomeHero movie={topRatedMovie} />
      </Suspense>

      <Suspense fallback={<div className="h-36" />}>
        <section className="relative z-10 mt-[-130px]">
          <Container>
            {/* @ts-expect-error TODO: fix this */}
            <MovieRow movies={trendingMovies.results} title="Trending Now" />
          </Container>
        </section>
      </Suspense>

      <TopFiveFeatured />
    </>
  );
}
