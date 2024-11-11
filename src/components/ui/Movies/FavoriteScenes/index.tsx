"use client";

import { Movie } from "@/types";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Container from "@/components/ui/container";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function FavoriteScenes({ movie }: { movie: Movie }) {
  const scenesShown = 3;
  const [loadMore, setLoadMore] = useState(scenesShown);
  const showMoreScenes = () => {
    setLoadMore(loadMore + scenesShown);
  };
  const { scenes } = movie;

  return (
    <section className="py-20">
      <Container>
        <h2 className="mb-8 text-4xl font-bold">Favorite Scenes</h2>

        <ul className="grid grid-cols-1 gap-16 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {scenes && scenes?.length > 0 ? (
            scenes.slice(0, loadMore).map((scene, index) => (
              <li key={index}>
                <BackgroundGradient
                  key={scene.title}
                  className="flex flex-col gap-2 rounded-3xl bg-zinc-900 p-8"
                >
                  <div className="relative h-[217px] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={scene.imgUrl}
                      alt={scene.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">{scene.title}</h2>
                  <div className="flex items-center gap-4">
                    <p>Starts: {scene.sceneStarts}</p>
                    <p>Ends: {scene.sceneEnds}</p>
                  </div>
                </BackgroundGradient>
              </li>
            ))
          ) : (
            <h2 className="p-4 text-red-500">No scenes created</h2>
          )}
        </ul>

        {scenes && scenes?.length && (
          <div className="mt-8 flex flex-col items-center text-center">
            {loadMore < scenes?.length && (
              <Button onClick={showMoreScenes}>Load More Scenes</Button>
            )}

            {loadMore < scenes?.length && (
              <p className="mt-8 flex justify-center">
                Showing {loadMore} of {scenes?.length} scenes
              </p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}