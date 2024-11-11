import { Movie } from "@/types";
import Container from "../../container";

import { AnimatedQuotes } from "../../animated-quotes";

export default function FavoriteQuotes({ movie }: { movie: Movie }) {
  const { quotes } = movie;
  return (
    <section className="pb-20">
      <Container>
        {/* @ts-expect-error TODO: fix this */}
        <AnimatedQuotes quotes={quotes} />
      </Container>
    </section>
  );
}
