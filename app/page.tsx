import { ChairmanSection } from "@/components/home/ChairmanSection";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Mission } from "@/components/home/Mission";
import { QuickLinks } from "@/components/home/QuickLinks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <>
      <Hero />
      <ChairmanSection />
      <Introduction />
      <Mission />
      <QuickLinks />
    </>
  );
}
