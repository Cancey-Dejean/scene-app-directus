import { SpotlightPreview } from "@/components/ui/SpotlightPreview";
import { getMovies } from "@/lib/schemas/movies";

export default async function AllMovies() {
  const movies = await getMovies();

  console.log(movies);

  return (
    <div className="space-y-8 overflow-hidden">
      <SpotlightPreview />
      {/*
      {movies.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <p>{movie.slug}</p>
          <p>{movie.banner.filename_disk}</p>

<div className={cn("grid gap-10", className)}></div
          {typeof movie.banner === "object" && (
            <div className="group relative h-60 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-neutral-900 md:h-96">
              <Image
                src={
                  `${process.env.DIRECTUS_API_ENDPOINT}/assets/${movie.banner.filename_disk}` ||
                  "https://dummyimage.com/560x400.png/22c55e/ffffff"
                }
                alt={movie.banner.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="rounded-2xl object-cover"
                priority={true}
              />
            </div>
          )}
        </div>
      ))} */}

      {/* <FocusCards movies={movies} className="grid-cols-4" /> */}
    </div>
  );
}
