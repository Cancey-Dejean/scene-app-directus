"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

import Link from "next/link";
// import { movieDateFormat } from "@/constants";
// import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Movie } from "@/types";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Movie;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    // const { title, slug, banner } = card;
    const {
      title,
      // release_date,
      banner,
      // synopsis,
      // category,
      // favorite_scenes,
      slug,
    } = card;
    const imageUrl =
      banner && typeof banner === "object" && banner.filename_disk
        ? `${process.env.DIRECTUS_API_ENDPOINT}/assets/${banner.filename_disk}`
        : "https://dummyimage.com/560x400.png/22c55e/ffffff";

    console.log(imageUrl);
    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "group relative h-60 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-neutral-900 md:h-96",
          hovered !== null && hovered !== index && "scale-[0.98] blur-sm",
        )}
      >
        <Image
          src={`${process.env.DIRECTUS_API_ENDPOINT}/assets/${banner.id}`}
          alt={banner.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="absolute inset-0 object-cover transition-all duration-300 ease-out group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/50 to-black/10 px-4 py-8 transition-opacity duration-300",
          )}
        >
          <div className="flex grow items-center justify-between gap-4 bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
            <div>
              <h2 className={cn("text-white")}>{title}</h2>

              {/* <p className="text-sm">
                {card.release_date &&
                  `(${format(card.release_date, movieDateFormat)})`}
              </p> */}
            </div>

            <Button asChild variant="secondary">
              <Link
                href={`/movies/${slug}`}
                className={cn(
                  "after:absolute after:inset-0",
                  hovered === index ? "opacity-100" : "opacity-0",
                )}
              >
                See more
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export function FocusCards({
  movies,
  className,
}: {
  movies: Movie[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid gap-10", className)}>
      {movies.map((movie, index) => (
        <Card
          key={movie.id}
          card={movie}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
