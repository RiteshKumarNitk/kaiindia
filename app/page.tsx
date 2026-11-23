import { DirectorSection } from "@/components/home/DirectorSection";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Mission } from "@/components/home/Mission";
import { OfficeBearers } from "@/components/home/OfficeBearers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <>
      <Hero />
      <DirectorSection />
      <OfficeBearers />
      <Introduction />
      <Mission />
    </>
  );
}
