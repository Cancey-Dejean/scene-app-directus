import { fetchTvShowsByIds } from "@/actions/tmdb";
import { getTvShows } from "@/lib/schemas/shows";
import { Suspense } from "react";
import { ShowDetail } from "@/app/tv/_components/ShowDetail";

type Props = {
  params: Promise<{ showId: string }>;
};

export default async function MovieDetailsPage(props: Props) {
  const { showId } = await props.params;

  const [tmdbShowDetails] = await Promise.all([
    fetchTvShowsByIds([showId]),
    getTvShows(),
  ]);

  const tmdbShow = tmdbShowDetails[0];
  // const show = cmsTvShows.find((show) => show.showId === showId);

  // console.log(movie);

  return (
    <>
      <Suspense>
        {/* @ts-expect-error TODO: fix this */}
        <ShowDetail show={tmdbShow} />
      </Suspense>
    </>
  );
}
