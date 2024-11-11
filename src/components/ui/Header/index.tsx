"use client";

import Link from "next/link";
import { Button } from "../Button";

import { usePathname } from "next/navigation";
import Container from "../container";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full px-4 py-4 transition duration-500 lg:px-8",
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "",
      )}
    >
      <Container className="flex items-center justify-between text-white">
        <div className="hidden space-x-4 md:flex">
          <Link
            href="/"
            className={`text-sm ${
              isActive("/") ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={`text-sm ${
              isActive("/movies")
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Movies
          </Link>
        </div>

        <Link
          href="/"
          className="font-monoton absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 text-2xl font-bold text-green-500"
        >
          Scene
          <span className="text-white">it</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <SearchIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/browse">Browse</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}