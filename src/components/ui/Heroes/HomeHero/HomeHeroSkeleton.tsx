import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeHeroSkeleton() {
  return (
    <section className="relative h-[800px] w-full">
      <Skeleton className="h-full w-full rounded-xl bg-gray-900" />
    </section>
  );
}
