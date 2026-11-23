import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { directorImages, directorMessage } from "@/content/leadership";
import { isPublished } from "@/lib/content-status";

/** Director's feature section on the homepage with an interactive photo slider and message excerpt. */
export function DirectorSection() {
  if (!isPublished(directorMessage)) return null;

  return (
    <section className="home-director" aria-labelledby="home-director-title">
      <div className="container">
        <div className="home-director__head">
          <p className="eyebrow">Leadership &amp; Vision</p>
          <h2 id="home-director-title" className="home-director__title">
            Message from the Director
          </h2>
          <span className="tricolour-rule" aria-hidden="true" />
        </div>

        <div className="home-director__grid">
          <div className="home-director__media">
            <ImageSlider
              images={directorImages}
              title="Mr. Likha Tara Ji, Director of KAI"
              showThumbnails
              className="slider--director-home"
            />
          </div>

          <div className="home-director__content">
            <span className="leader-message__mark" aria-hidden="true">
              “
            </span>
            <p className="home-director__lead">{directorMessage.paragraphs[0]}</p>
            <p className="home-director__text">{directorMessage.paragraphs[1]}</p>

            <footer className="leader-message__sign">
              <span className="leader-message__rule" aria-hidden="true" />
              <strong>{directorMessage.name}</strong>
              <span>{directorMessage.designation}</span>
            </footer>

            <div className="home-director__actions">
              <Link href="/organisation/director-message" className="button button--primary">
                Read full message <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
