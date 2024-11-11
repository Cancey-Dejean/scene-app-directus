import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Calendar, Film } from "lucide-react";
import { imageBaseUrl } from "@/constants";
import Container from "../container";

interface MovieDetailProps {
  details: {
    backdrop_path: string;

    belongs_to_collection: {
      backdrop_path: string;
      id: number;
      name: string;
      poster_path: string;
    };
    budget: number;
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    original_title: string;
    title?: string;
    popularity: number;
    poster_path: string;
    overview: string;
    name?: string;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    number_of_seasons?: number;
    videos: {
      results: Array<{
        type: string;
        name: string;
        key: string;
        published_at: string;
        site: string;
      }>;
    };
    production_companies: Array<{
      logo_path: string;
      name: string;
      origin_country: string;
    }>;
    release_date?: string;
    revenue: number;
    runtime?: number;
    tagline?: string;
    credits: {
      cast: Array<{
        name: string;
        profile_path: string;
        original_name: string;
        character: string;
      }>;
    };
    similar: {
      results: Array<{
        id: number;
        poster_path: string;
        backdrop_path: string;
        title: string;
        name: string;
        original_title: string;
        vote_average: number;
        vote_count: number;
      }>;
    };
  };
}

export function MovieDetail({ details }: MovieDetailProps) {
  const title = details.title || details.name || "";
  const releaseDate = details.release_date || details.first_air_date;
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Release date unknown";

  const duration =
    details.runtime &&
    `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`;

  return (
    <section className="relative h-[600px] w-full">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        <Image
          src={`${imageBaseUrl}${details.backdrop_path}`}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-end pb-10">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
          {title}
        </h1>
        {details.tagline && (
          <p className="mb-4 text-xl text-gray-300">{details.tagline}</p>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {details.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            <span>{Math.round(details.vote_average * 10) / 10}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Film className="size-5" />
            <span className="capitalize">movie</span>
          </div>
        </div>

        <div className="mt-4 max-w-4xl">
          <p className="text-lg text-gray-300">{details.overview}</p>
        </div>
      </Container>
    </section>
  );
}
