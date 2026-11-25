import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { chairmanImages, chairmanMessage } from "@/content/leadership";
import { isPublished } from "@/lib/content-status";

/** Chairman's feature section on the homepage with an interactive photo slider and message excerpt. */
export function ChairmanSection() {
  if (!isPublished(chairmanMessage)) return null;

  return (
    <section className="home-chairman" aria-labelledby="home-chairman-title">
      <div className="container">
        <div className="home-chairman__head">
          <p className="eyebrow">Leadership &amp; Vision</p>
          <h2 id="home-chairman-title" className="home-chairman__title">
            Message from the Chairman
          </h2>
          <span className="tricolour-rule" aria-hidden="true" />
        </div>

        <div className="home-chairman__grid">
          <div className="home-chairman__media">
            <ImageSlider
              images={chairmanImages}
              title="Mr. Likha Tara Ji, Chairman of KAI"
              showThumbnails
              className="slider--chairman-home"
            />
          </div>

          <div className="home-chairman__content">
            <span className="leader-message__mark" aria-hidden="true">
              “
            </span>
            <p className="home-chairman__lead">{chairmanMessage.paragraphs[0]}</p>
            <p className="home-chairman__text">{chairmanMessage.paragraphs[1]}</p>

            <footer className="leader-message__sign">
              <span className="leader-message__rule" aria-hidden="true" />
              <strong>{chairmanMessage.name}</strong>
              <span>{chairmanMessage.designation}</span>
            </footer>

            <div className="home-chairman__actions">
              <Link href="/about/chairman-message" className="button button--primary">
                Read full message <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
