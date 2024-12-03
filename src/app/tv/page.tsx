import { fetchTvShowsByIds } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import HeroBannerTv from "@/components/ui/Heroes/HeroBannerTv";
import TvShowList from "@/app/tv/_components/TvShowList";
import { getTvShows } from "@/lib/schemas/shows";
import { Suspense } from "react";

export default async function TV() {
  const tvShows = await getTvShows();

  const allShows = await fetchTvShowsByIds(
    tvShows.map((tvShow: { showId?: string | null }) => String(tvShow.showId)),
  );

  // console.log(allShows);

  return (
    <>
      <Suspense>
        <HeroBannerTv tv={allShows} />
      </Suspense>

      <Suspense>
        <section className="bg-black py-40">
          <Container>
            <TvShowList tvShows={allShows} />

            {tvShows.length === 0 && (
              <p className="text-center text-lg text-gray-400">
                No movies found
              </p>
            )}
          </Container>
        </section>
      </Suspense>
    </>
  );
}
