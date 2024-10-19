import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { title, banner, slug } = movie;

  return (
    <Card className="rounded-3xl">
      <CardContent className="relative rounded-3xl p-4">
        <div className="relative h-[400px] w-full">
          {typeof banner === "object" && (
            <Image
              src={
                `${process.env.DIRECTUS_API_ENDPOINT}/assets/${banner.filename_disk}` ||
                "https://dummyimage.com/560x400.png/22c55e/ffffff"
              }
              alt={banner.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="rounded-2xl object-cover"
              priority={true}
            />
          )}

          <Link
            href={`/movies/${slug}`}
            className="absolute inset-0 flex w-full flex-col justify-end bg-gradient-to-t from-transparent px-5 py-8 text-center after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-transparent after:to-black/80"
          >
            <h3 className="relative z-10 mt-2 text-3xl font-semibold text-white">
              {title}
            </h3>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
