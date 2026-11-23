import Image from "next/image";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { committees, published, stateAssociations } from "@/lib/content-data";
import { states, unionTerritories, type Region } from "@/lib/india-states";
import type { CommitteeKey, CommitteeMember, ComingSoonCopy, StateAssociation } from "@/lib/types";
import { IndiaMap } from "./IndiaMap";

function RegionList({ title, regions }: { title: string; regions: Region[] }) {
  const id = `regions-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className="region-group">
      <h3 id={id} className="region-group__title">
        {title} <span className="region-group__count">{regions.length}</span>
      </h3>
      <ol className="region-list">
        {regions.map((r) => (
          <li key={r.code} id={`region-${r.code}`} className={`region is-${r.kind}`}>
            <span className="region__name">{r.name}</span>
            {r.mapNote && <span className="region__note">{r.mapNote}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function MemberCard({ member }: { member: CommitteeMember }) {
  const initials = member.name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <article className="member-card">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}, ${member.designation}`}
          width={480}
          height={600}
          sizes="(max-width: 40rem) 50vw, (max-width: 64rem) 33vw, 18rem"
          className="member-card__photo"
          style={member.photoFocus ? { objectPosition: member.photoFocus } : undefined}
        />
      ) : (
        <div className="member-card__photo member-card__photo--empty" aria-hidden="true">
          {initials}
        </div>
      )}
      <div className="member-card__body">
        <p className="member-card__role">{member.designation}</p>
        <h3>{member.name}</h3>
        {member.affiliation && <p className="member-card__meta">{member.affiliation}</p>}
        {member.state && <p className="member-card__meta">{member.state}</p>}
        {member.biography && <p className="member-card__bio">{member.biography}</p>}
      </div>
    </article>
  );
}

/** Committee and judges pages: role of the body alongside its member listing. */
export function MemberDirectory({
  committee,
  focus,
  comingSoon,
}: {
  committee: CommitteeKey;
  focus: string[];
  comingSoon: ComingSoonCopy;
}) {
  const members = published(committees[committee]);
  const isJudges = committee === "judges";

  const role = (
    <section aria-labelledby="role-heading" className="role">
      <h2 id="role-heading" className="section-title">
        {isJudges ? "Directory scope" : "Role of the committee"}
      </h2>
      <p className="muted">
        {isJudges
          ? "Information typically included for each technical official. Entries are published only from records verified by the association."
          : members.length > 0
            ? "Areas a committee of this kind typically looks after. Its confirmed terms of reference will be published when supplied."
            : "Areas a committee of this kind typically looks after. Its confirmed terms of reference will be published with its members."}
      </p>
      <ul className="plain-list">
        {focus.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </section>
  );

  if (members.length > 0) {
    return (
      <>
        {role}
        <section aria-labelledby="members-heading">
          <h2 id="members-heading" className="section-title">
            {isJudges ? "Judges" : "Members"}
          </h2>
          <div className="member-grid">
            {members.map((m) => (
              <MemberCard key={`${m.name}-${m.designation}`} member={m} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="split">
      {role}
      <ComingSoon {...comingSoon} variant="section" icon="users">
        <p className="empty-state__note">
          Each profile will show a photograph, full name, official designation, state and a short biography.
        </p>
      </ComingSoon>
    </div>
  );
}

function StateRow({ entry }: { entry: StateAssociation }) {
  return (
    <tr>
      <th scope="row">{entry.state}</th>
      <td>{entry.associationName}</td>
      <td>{entry.representative ?? "—"}</td>
      <td>
        {entry.email && <a href={`mailto:${entry.email}`}>{entry.email}</a>}
        {entry.email && entry.phone && <br />}
        {entry.phone}
        {entry.website && (
          <>
            <br />
            <a href={entry.website} rel="noopener noreferrer" target="_blank">
              {entry.website.replace(/^https?:\/\//, "")}
            </a>
          </>
        )}
      </td>
      <td>{entry.recognitionStatus ?? "—"}</td>
    </tr>
  );
}

const stateColumns = ["State", "Association", "Representative", "Contact", "Status"];

/**
 * Associate states: map and list of all states and union territories, then the directory of
 * state associations, with an in-table empty state until records are verified.
 */
export function StateDirectory({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const entries = published(stateAssociations).sort((a, b) => a.state.localeCompare(b.state));
  return (
    <>
    <section aria-labelledby="regions-heading" className="regions">
      <div className="regions__head">
        <h2 id="regions-heading" className="section-title">
          States and Union Territories of India
        </h2>
        <p className="muted">
          India has {states.length} states and {unionTerritories.length} union territories. Select a region on the map
          to find it in the list.
        </p>
      </div>
      <div className="regions__grid">
        <IndiaMap />
        <div className="regions__lists">
          <RegionList title="States" regions={states} />
          <RegionList title="Union Territories" regions={unionTerritories} />
        </div>
      </div>
    </section>
    <section aria-labelledby="states-heading">
      <h2 id="states-heading" className="section-title">
        State associations
      </h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {stateColumns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((e) => <StateRow key={e.state} entry={e} />)
            ) : (
              <tr className="data-table__empty">
                <td colSpan={stateColumns.length}>
                  <ComingSoon {...comingSoon} variant="compact" headingLevel={3} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
}
