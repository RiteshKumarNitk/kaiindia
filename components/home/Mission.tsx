import { Icon, type IconName } from "@/components/ui/Icon";
import { associationIntro } from "@/content/association";
import { isPublished } from "@/lib/content-status";

const icons: IconName[] = ["map", "users", "shield", "trophy"];

/** Client-stated mission and objectives. No numerical highlights are shown. */
export function Mission() {
  if (!isPublished(associationIntro)) return null;
  const { lead, goals } = associationIntro.mission;
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="container">
        <div className="mission__head">
          <p className="eyebrow">Mission and objectives</p>
          <h2 id="mission-title" className="mission__title">
            Developing karate across India
          </h2>
          <p className="mission__lead">{lead}</p>
        </div>
        <ul className="mission__list">
          {goals.map((g, i) => (
            <li key={g.title} className="mission__item">
              <span className="mission__icon">
                <Icon name={icons[i] ?? "shield"} size={22} />
              </span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
