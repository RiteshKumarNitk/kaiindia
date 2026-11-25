"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { youTubeEmbedUrl, youTubeThumbnailUrl, youTubeWatchUrl } from "@/lib/youtube";

type Props = {
  videoId: string;
  title: string;
  description?: string;
  /** Pre-formatted date and its ISO value. */
  date?: { iso: string; label: string };
};

/**
 * Click-to-load YouTube card. Shows the thumbnail first; the privacy-enhanced player
 * (youtube-nocookie.com) is only created when the visitor presses Play, so the page does
 * not load a YouTube iframe for every video.
 */
export function YouTubeCard({ videoId, title, description, date }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="video-card">
      <div className="video-card__media">
        {playing ? (
          <iframe
            src={youTubeEmbedUrl(videoId)}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-card__play" onClick={() => setPlaying(true)}>
            <Image
              src={youTubeThumbnailUrl(videoId)}
              alt=""
              fill
              sizes="(max-width: 48rem) 100vw, (max-width: 76rem) 50vw, 36rem"
              className="video-card__thumb"
            />
            <span className="video-card__play-icon" aria-hidden="true">
              <Icon name="play" size={28} />
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
        )}
      </div>
      <div className="video-card__body">
        {date && (
          <time dateTime={date.iso} className="news-card__date">
            {date.label}
          </time>
        )}
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <a className="text-link" href={youTubeWatchUrl(videoId)} target="_blank" rel="noopener noreferrer">
          Watch on YouTube <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
