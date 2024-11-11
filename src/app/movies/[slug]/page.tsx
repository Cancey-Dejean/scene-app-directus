import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { movieDateFormat } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovies } from "@/lib/schemas/movies";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FavoriteScene, Genre } from "@/types";
import { Hero } from "@/components/ui/Hero";

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const movies = await getMovies();

  const movie = movies.find((m) => m.slug === params.slug);

  if (!movie) return notFound();

  const { title, synopsis, banner } = movie;

  return {
    title: title || "Add a title",
    description: synopsis || "Add a description",
    openGraph: {
      title: title || "Add a title",
      images: [
        {
          url: `${process.env.DIRECTUS_API_ENDPOINT}/assets/${banner.filename_disk}`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const movies = await getMovies();

  return movies.map(({ slug }) => ({ slug }));
}

export default async function MovieDetails(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const movies = await getMovies();

  // Find the movie that matches the slug
  const movie = movies.find((m) => m.slug === params.slug);

  if (!movie) {
    return notFound();
  }

  const {
    title,
    release_date,
    banner,
    trailer_url,
    synopsis,
    genres,
    favorite_scenes,
  } = movie;

  // console.log(genres[0].categories_id.slug);
  return (
    <>
      <Hero movie={movie} />
      <section>
        <div className="relative h-[34rem] overflow-hidden rounded-3xl">
          <Image
            src={
              `${process.env.DIRECTUS_API_ENDPOINT}/assets/${banner.id}` ||
              "https://dummyimage.com/1200x544.png/22c55e/ffffff"
            }
            alt={banner.title}
            fill
            className={cn("object-cover", "object-center")}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center bg-gradient-to-r from-black/80 via-black/40 to-black/0 px-10 text-white">
            <h1 className="mb-4 flex gap-2 text-6xl font-bold">
              {title}
              <span>
                {release_date && `(${format(release_date, movieDateFormat)})`}
              </span>
            </h1>

            {synopsis && <p className="max-w-[30rem] text-2xl">{synopsis}</p>}

            {trailer_url && (
              <Button className="mt-4" asChild>
                <Link href={trailer_url} target="_blank">
                  Trailer
                </Link>
              </Button>
            )}

            {genres && genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((genre: Genre) => (
                  <Badge key={genre.categories_id.title}>
                    <Link href={`/genres/${genre.categories_id.slug}`}>
                      {genre.categories_id.title}
                    </Link>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {favorite_scenes && favorite_scenes.length > 0 && (
        <section className="flex flex-col gap-8 py-20">
          <h3 className="text-center text-3xl font-bold">Favorite Scenes</h3>
          <div className="mx-auto w-full max-w-7xl gap-8">
            {favorite_scenes?.map(
              ({
                title,
                description,
                image,
                scene_start,
                scene_end,
                scene_url,
              }: FavoriteScene) => (
                <Dialog key={title}>
                  <div
                    className={cn(
                      "grid gap-4",
                      favorite_scenes.length > 1
                        ? "grid-cols-2"
                        : "grid-cols-1",
                    )}
                  >
                    <DialogTrigger asChild>
                      <div className="flex cursor-pointer flex-col items-center justify-between rounded-xl border p-4 transition-all duration-200 ease-in-out hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row">
                        <div className="item-center flex gap-4">
                          <div className="relative h-16 w-[100px]">
                            <Image
                              src={image}
                              className="rounded-lg object-cover"
                              alt=""
                              fill
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-3xl font-semibold">{title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                              <span className="font-bold">Scene:</span>{" "}
                              {scene_start} - {scene_end}
                            </p>
                          </div>
                        </div>
                        <Button
                          className={"rounded-full px-4 py-2 text-sm font-bold"}
                        >
                          Details
                        </Button>
                      </div>
                    </DialogTrigger>
                  </div>

                  <DialogContent>
                    <DialogHeader>
                      <div className="relative mb-5 h-[320px] w-full overflow-hidden rounded-xl">
                        <Image
                          src={image}
                          className="object-cover"
                          alt=""
                          fill
                        />
                      </div>
                      <DialogTitle className="flex items-start justify-between gap-4">
                        <h4 className="text-3xl font-semibold">{title}</h4>

                        {scene_url && (
                          <Button
                            className={
                              "rounded-full px-4 py-2 text-sm font-bold hover:text-white"
                            }
                            asChild
                          >
                            <Link href={scene_url} target="_blank">
                              Watch
                            </Link>
                          </Button>
                        )}
                      </DialogTitle>
                      <DialogDescription className="flex flex-col gap-5">
                        <p className="text-neutral-600 dark:text-neutral-400">
                          <span className="font-bold">Scene:</span>{" "}
                          {scene_start} - {scene_end}
                        </p>

                        {description && (
                          <div>
                            <p>{description}</p>
                          </div>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ),
            )}
          </div>
        </section>
      )}
    </>
  );
}
