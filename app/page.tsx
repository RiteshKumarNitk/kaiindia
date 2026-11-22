import { Hero } from "@/components/home/Hero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
    </>
  );
}
