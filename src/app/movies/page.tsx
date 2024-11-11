import { Card, CardContent } from "@/components/ui/card";
import { SpotlightPreview } from "@/components/ui/SpotlightPreview";
import { getMovies } from "@/lib/schemas/movies";
import Image from "next/image";
import { format } from "date-fns";
import { movieDateFormat } from "@/constants";
import Container from "@/components/ui/container";
export default async function AllMovies() {
  const movies = await getMovies();

  return (
    <div className="space-y-8 overflow-hidden">
      <SpotlightPreview />

      <Container className="grid grid-cols-6 gap-4">
        {movies.map(({ title, release_date, poster }) => (
          <Card key={title}>
            <CardContent className="flex flex-col gap-2 px-2 py-4">
              <Image
                src={`${process.env.DIRECTUS_API_ENDPOINT}/assets/${poster.filename_disk}`}
                alt={title}
                width={194}
                height={287}
              />

              <div className="flex flex-col items-center justify-center">
                <p>{title}</p>
                <p>
                  {release_date && `(${format(release_date, movieDateFormat)})`}
                </p>
              </div>

              {/* <p>{movie.banner.filename_disk}</p> */}
            </CardContent>
          </Card>
        ))}
      </Container>

      {/* <FocusCards movies={movies as Movie[]} className="grid-cols-4" /> */}
    </div>
  );
}
