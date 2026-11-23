import Image from "next/image";
import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { galleryPhotos, newsArticles, videos } from "@/content/media";
import { published } from "@/lib/content-status";
import { formatDate } from "@/lib/format";
import type { ComingSoonCopy, NewsArticle, VideoItem } from "@/lib/types";


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
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
              />
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------- Videos */

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="video-card">
      <div className="video-card__media">
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : video.thumbnail ? (
          <Image src={video.thumbnail.src} alt={video.thumbnail.alt} width={640} height={360} />
        ) : (
          <div className="video-card__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="video-card__body">
        {video.date && (
          <time dateTime={video.date} className="news-card__date">
            {formatDate(video.date)}
          </time>
        )}
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </article>
  );
}

export function VideoGallery({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const items = published(videos);
  if (items.length === 0) return <EmptyMedia comingSoon={comingSoon} kind="videos" />;
  return (
    <section aria-labelledby="videos-heading">
      <h2 id="videos-heading" className="section-title">Videos</h2>
      <div className="card-grid card-grid--wide">
        {items.map((v) => (
          <VideoCard key={v.youtubeId ?? v.title} video={v} />
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

function EmptyMedia({ comingSoon, kind }: { comingSoon: ComingSoonCopy; kind: "news" | "photos" | "videos" }) {
  const meta = emptyMeta[kind];
  return (
    <section aria-labelledby={`${kind}-heading`}>
      <div className="section-bar">
        <h2 id={`${kind}-heading`} className="section-title">
          {meta.heading}
        </h2>
        <span className="section-bar__count">0 published</span>
      </div>
      <ComingSoon {...comingSoon} variant="hero" icon={meta.icon} headingLevel={3} />
    </section>
  );
}
