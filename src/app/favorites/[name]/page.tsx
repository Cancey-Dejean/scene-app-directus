import { fetchMoviesByIds } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import { FocusCards } from "@/components/ui/focus-cards";
import FavoriteRow from "@/components/ui/Movies/FavoriteRow";
import { imageBaseUrl } from "@/constants";
import { getFavorites } from "@/lib/schemas/movies";
import { FavoriteMovie } from "@/types";
import Image from "next/image";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function Page(props: Props) {
  const { name } = await props.params;
  const favorites = await getFavorites();

  // Find the favorite list matching the name parameter
  const userFavorites = favorites.find(
    (favorite) => favorite.name.toLowerCase() === name.toLowerCase(),
  );

  if (!userFavorites) {
    // Handle case when user's favorites are not found
    throw new Error("Favorites not found for this user");
  }

  const [
    top5Movies,
    topComedies,
    topActions,
    topDramas,
    topDocumentaries,
    topMartialArts,
    topChristmas,
    topHorrors,
    topThrillers,
    topHood,
  ] = await Promise.all([
    fetchMoviesByIds(
      userFavorites.top5
        .slice(0, 5)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topComedy
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topAction
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topDrama
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topDocumentary
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topMartialArts
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topChristmas
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topHorror
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topThriller
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
    fetchMoviesByIds(
      userFavorites.topHood
        .slice(0, 10)
        .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
    ),
  ]);

  // console.log(topHorrors);

  return (
    <>
      {/* Hero Favorite */}
      <section className="relative h-[600px] w-full 3xl:h-[700px]">
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

        <div className="absolute inset-0 z-[1]">
          <Image
            src={`${imageBaseUrl}${top5Movies[0].backdrop_path}`}
            alt={top5Movies[0].title || top5Movies[0].original_title || ""}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <Container className="relative z-[2] flex h-full flex-col justify-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-white md:text-8xl">
              {/* {top5Movies[0].title || top5Movies[0].original_title} */}
              <span className="capitalize">{name}&apos;s</span> Favorites
            </h1>
            {/* <p className="text-lg text-white">{top5Movies[0].tagline}</p> */}
          </div>
        </Container>
      </section>

      <section className="relative z-[4] -mt-[100px]">
        <Container className="grid grid-cols-5 gap-4">
          <FocusCards cards={top5Movies} />
        </Container>
      </section>

      <section className="mt-10">
        <Container className="flex flex-col gap-4">
          <FavoriteRow title="Comedy" movies={topComedies} />
          <FavoriteRow title="Action" movies={topActions} />
          <FavoriteRow title="Drama" movies={topDramas} />
          <FavoriteRow title="Documentary" movies={topDocumentaries} />
          <FavoriteRow title="Martial Arts" movies={topMartialArts} />
          <FavoriteRow title="Christmas" movies={topChristmas} />
          <FavoriteRow title="Horror" movies={topHorrors} />
          <FavoriteRow title="Thriller" movies={topThrillers} />
          <FavoriteRow title="Hood Classics" movies={topHood} />
        </Container>
      </section>
    </>
  );
}
