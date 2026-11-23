import Image from "next/image";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { directorMessage } from "@/content/leadership";
import { isPublished } from "@/lib/content-status";
import type { ComingSoonCopy } from "@/lib/types";

/** The Director's message page body. */
export function MessagePanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const msg = directorMessage;
  if (!isPublished(msg) || msg.paragraphs.length === 0) {
    return <ComingSoon {...comingSoon} variant="section" />;
  }
  const [first, ...rest] = msg.paragraphs;
  const hasSlider = msg.images && msg.images.length > 0;

  return (
    <article className="leader-message" aria-labelledby="message-signature">
      {hasSlider ? (
        <div className="leader-message__slider-col">
          <ImageSlider
            images={msg.images!}
            title={`Photographs of ${msg.name || "the Director"}`}
            showThumbnails
            className="slider--director-page"
          />
        </div>
      ) : msg.portrait && msg.name ? (
        <Image
          src={msg.portrait}
          alt={`Portrait of ${msg.name}`}
          width={360}
          height={440}
          className="leader-message__portrait"
        />
      ) : null}
      <div className="leader-message__body">
        <span className="leader-message__mark" aria-hidden="true">
          “
        </span>
        <p className="leader-message__lead">{first}</p>
        {rest.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        {msg.name && (
          <footer className="leader-message__sign" id="message-signature">
            <span className="leader-message__rule" aria-hidden="true" />
            <strong>{msg.name}</strong>
            {msg.designation && <span>{msg.designation}</span>}
          </footer>
        )}
      </div>
    </article>
  );
}
