import { Movie } from "@/types";
import { FocusCards } from "../../focus-cards";

export default function FavoriteRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <div className="py-10">
      <h2 className="mb-10 text-4xl font-bold text-white">{title}</h2>

      {movies.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => (
            <FocusCards key={movie.title} cards={movies} />
          ))}
        </div>
      ) : (
        <p className="text-white">No movies added yet.</p>
      )}
    </div>
  );
}
