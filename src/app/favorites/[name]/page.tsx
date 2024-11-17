import { fetchMoviesByIds } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import { FocusCards } from "@/components/ui/focus-cards";
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

  const top5Movies = await fetchMoviesByIds(
    userFavorites.top5
      .slice(0, 5)
      .map((favorite: FavoriteMovie) => favorite.movies_id.movieId),
  );

  // console.log(favorites[0].top5[0].movies_id.movieId);

  return (
    <>
      {/* Hero Favorite */}
      <section className="3xl:h-[700px] relative h-[600px] w-full">
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
      {/* <HeroFavorites movie={top5Movies[0]} /> */}
    </>
  );
}
