import Image from "next/image";

export default function Home() {
  return (
    <div className="poster">
      <header className="masthead">
        <div className="identity">
          <Image src="/kai-crest.jpg" alt="" width={68} height={68} unoptimized />
          <p>Karate Association<br />of India</p>
        </div>
        <div className="stripes" aria-hidden="true"><i /><i /><i /></div>
      </header>

      <main className="hero">
        <div className="announcement">
          <h1>Coming <span>soon<span className="period">.</span></span></h1>
          <div className="brush" aria-hidden="true" />
        </div>
        <Image className="athlete" src="/karate.webp" width={1254} height={1254}
          alt="" preload unoptimized />
      </main>

      <footer>© {new Date().getFullYear()} Karate Association of India</footer>
    </div>
  );
}
