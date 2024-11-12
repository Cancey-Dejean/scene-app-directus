import Link from "next/link";
import Container from "../container";
import { GlareCard } from "@/components/ui/glare-card";
import Image from "next/image";

const topFiveMovies = [
  {
    name: "Ronald",
    image:
      "https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Erwin",
    image:
      "https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cancey",
    image:
      "https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function TopFiveFeatured() {
  return (
    <section className="relative py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {topFiveMovies.map(({ name, image }, index) => (
            <div className="group relative" key={index}>
              <GlareCard className="flex flex-col items-center justify-center p-5">
                <Image
                  className="absolute inset-0 h-full w-full object-cover"
                  src={image}
                  alt={name}
                  width={453}
                  height={559}
                />
                <h3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-monoton text-[20rem] text-white opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                  {name.charAt(0)}
                </h3>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-5xl text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <p>{name}&apos;s</p>
                  <p className="font-monoton">Movies</p>
                </div>
              </GlareCard>
              <Link
                href={`favorites/${name.toLowerCase()}`}
                className="z-10 after:absolute after:inset-0"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
