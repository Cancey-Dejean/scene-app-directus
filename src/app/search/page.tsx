import { Suspense } from "react";
import Form from "next/form";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";
import { FocusCards } from "@/components/ui/focus-cards";
import { getMovies } from "@/lib/schemas/movies";
import { fetchMoviesByIds } from "@/actions/tmdb";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { query } = await searchParams;
  const movies = await getMovies();

  // Filter movies based on search query
  const filteredMovies = query
    ? movies.filter((movie) => {
        const movieTitle = movie.title?.toLowerCase() || "";
        const searchQuery = query.toLowerCase();
        return movieTitle.includes(searchQuery);
      })
    : [];

  // Fetch movies by IDs from TMDB to show the query results
  const searchResults = query
    ? await fetchMoviesByIds(
        filteredMovies
          .filter((movie) => movie.movieId != null)
          .map((movie) => String(movie.movieId)),
      )
    : [];

  // console.log(filteredMovies);

  return (
    <section className="bg-black py-40">
      <Container>
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">Search</h1>

          {query && searchResults.length > 0 && (
            <p className="text-lg text-muted-foreground">
              {searchResults.length} movies found
            </p>
          )}

          <Form action="/search" className="relative w-fit min-w-[300px]">
            <Input
              name="query"
              placeholder="Search..."
              defaultValue={query}
              className="max-w-md bg-gray-900 pr-9 text-white"
              type="search"
              required
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-1/2 z-10 flex w-6 -translate-y-1/2 items-center justify-end bg-transparent pr-3 hover:bg-transparent"
            >
              <Search className="size-4 text-white" />
              <span className="sr-only">Search</span>
            </Button>
          </Form>
        </div>

        {!query && <p className="mt-8 text-lg text-gray-400">Add Banner</p>}

        <Suspense>
          <div className="mt-8 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <FocusCards cards={searchResults} />
          </div>
        </Suspense>

        {query && searchResults.length === 0 && (
          <p className="text-lg text-gray-400">
            No results found for &quot;{query}&quot;
          </p>
        )}
      </Container>
    </section>
  );
}
