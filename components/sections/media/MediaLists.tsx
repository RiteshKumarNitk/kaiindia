import Image from "next/image";
import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { galleryPhotos, newsArticles, videos } from "@/content/media";
import { published } from "@/lib/content-status";
import { formatDate } from "@/lib/format";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { getYouTubeId } from "@/lib/youtube";
import type { ComingSoonCopy, NewsArticle } from "@/lib/types";
import { YouTubeCard } from "./YouTubeCard";


/* ------------------------------------------------------------------ News */

export function NewsCard({ article }: { article: NewsArticle }) {
  const external = article.href?.startsWith("http");
  return (
    <article className="news-card">
      {article.image ? (
        <Image src={article.image.src} alt={article.image.alt} width={640} height={400} className="news-card__image" />
      ) : (
        <div className="news-card__image news-card__image--empty" aria-hidden="true" />
      )}
      <div className="news-card__body">
        <time dateTime={article.date} className="news-card__date">
          {formatDate(article.date)}
        </time>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        {article.href &&
          (external ? (
            <a href={article.href} className="text-link" rel="noopener noreferrer" target="_blank">
              Read more <span className="sr-only">about {article.title}</span> <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link href={article.href} className="text-link">
              Read more <span className="sr-only">about {article.title}</span> <span aria-hidden="true">→</span>
            </Link>
          ))}
      </div>
    </article>
  );
}

export function NewsList({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const items = published(newsArticles).sort((a, b) => b.date.localeCompare(a.date));
  if (items.length === 0) return <EmptyMedia comingSoon={comingSoon} kind="news" />;
  return (
    <section aria-labelledby="news-heading">
      <h2 id="news-heading" className="section-title">Latest news</h2>
      <div className="card-grid">
        {items.map((a) => (
          <NewsCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Photos */

export function PhotoGallery({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const photos = published(galleryPhotos);
  if (photos.length === 0) return <EmptyMedia comingSoon={comingSoon} kind="photos" />;
  return (
    <section aria-labelledby="photos-heading">
      <h2 id="photos-heading" className="section-title">Photographs</h2>
      <ul className="gallery-grid">
        {photos.map((p) => (
          <li key={p.src}>
            <figure>
              {/* Opens the original image; shown uncropped so posters keep all their text. */}
              <a href={p.src} target="_blank" rel="noopener noreferrer" className="gallery-grid__link">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                />
                <span className="sr-only">(opens full size in a new tab)</span>
              </a>
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------- Videos */

/** Video Gallery: approved YouTube links from content/media.ts, shown as click-to-load cards. */
export function VideoGallery({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const items = published(videos)
    .map((v) => ({ ...v, videoId: getYouTubeId(v.youtubeUrl) }))
    .filter((v): v is typeof v & { videoId: string } => v.videoId !== null)
    .sort((x, y) => (y.publishedAt ?? "").localeCompare(x.publishedAt ?? ""));
  const channel = siteConfig.social.youtube;
  const channelLink = channel ? (
    <a className="button button--primary video-channel" href={channel} target="_blank" rel="noopener noreferrer">
      <Icon name="video" size={18} /> Watch on our YouTube channel <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : null;

  if (items.length === 0) return <EmptyMedia comingSoon={comingSoon} kind="videos">{channelLink}</EmptyMedia>;
  return (
    <section aria-labelledby="videos-heading">
      <div className="section-bar">
        <h2 id="videos-heading" className="section-title">
          Videos
        </h2>
        {channelLink}
      </div>
      <div className="card-grid card-grid--wide">
        {items.map((v) => (
          <YouTubeCard
            key={v.videoId}
            videoId={v.videoId}
            title={v.title}
            description={v.description}
            date={v.publishedAt ? { iso: v.publishedAt, label: formatDate(v.publishedAt) } : undefined}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Empty state */

const emptyMeta = {
  news: { heading: "Latest news", icon: "news" },
  photos: { heading: "Gallery", icon: "photo" },
  videos: { heading: "Videos", icon: "video" },
} as const;

function EmptyMedia({
  comingSoon,
  kind,
  children,
}: {
  comingSoon: ComingSoonCopy;
  kind: "news" | "photos" | "videos";
  children?: ReactNode;
}) {
  const meta = emptyMeta[kind];
  return (
    <section aria-labelledby={`${kind}-heading`}>
      <div className="section-bar">
        <h2 id={`${kind}-heading`} className="section-title">
          {meta.heading}
        </h2>
        <span className="section-bar__count">0 published</span>
      </div>
      <ComingSoon {...comingSoon} variant="hero" icon={meta.icon} headingLevel={3}>
        {children}
      </ComingSoon>
    </section>
  );
}
