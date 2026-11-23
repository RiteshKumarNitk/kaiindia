import Image from "next/image";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { committees } from "@/content/people";
import { published } from "@/lib/content-status";
import type { CommitteeKey, CommitteeMember, ComingSoonCopy } from "@/lib/types";

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
          sizes="(max-width: 40rem) 45vw, 15rem"
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
