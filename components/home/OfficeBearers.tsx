import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import { committees, published } from "@/lib/content-data";

/** Homepage list of office bearers, in the client's order of precedence, with photographs. */
export function OfficeBearers() {
  const members = published(committees.executive);
  if (members.length === 0) return null;

  return (
    <section className="bearers" aria-labelledby="bearers-title">
      <div className="container">
        <div className="bearers__head">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 id="bearers-title" className="bearers__title">
              Office Bearers
            </h2>
          </div>
          <Link href="/organisation/executive-committee" className="text-link">
            Executive Committee <Icon name="arrow" size={16} />
          </Link>
        </div>

        <ol className="bearers__list">
          {members.map((m, i) => (
            <li key={`${m.name}-${m.designation}`} className={`bearer${i === 0 ? " bearer--lead" : ""}`}>
              <div className="bearer__photo">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`Portrait of ${m.name}, ${m.designation}, Karate Association of India`}
                    width={480}
                    height={600}
                    sizes="(max-width: 40rem) 45vw, (max-width: 64rem) 30vw, 17rem"
                    style={m.photoFocus ? { objectPosition: m.photoFocus } : undefined}
                  />
                ) : null}
              </div>
              <div className="bearer__body">
                <p className="bearer__role">{m.designation}</p>
                <h3 className="bearer__name">{m.name}</h3>
                {m.affiliation && <p className="bearer__meta">{m.affiliation}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
