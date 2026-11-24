import Image from "next/image";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { committees } from "@/content/people";
import { published } from "@/lib/content-status";
import type { ReactNode } from "react";
import type { IconName } from "@/components/ui/Icon";
import type { CommitteeKey, CommitteeMember, ComingSoonCopy } from "@/lib/types";

export function MemberCard({ member, priority = false }: { member: CommitteeMember; priority?: boolean }) {
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
          loading={priority ? "eager" : "lazy"}
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
  icon,
  showProfileNote = true,
  children,
}: {
  committee: CommitteeKey;
  focus: string[];
  comingSoon: ComingSoonCopy;
  icon?: IconName;
  showProfileNote?: boolean;
  children?: ReactNode;
}) {
  const members = published(committees[committee]);
  const isJudges = committee === "judges";

  // Pages may omit `focus` (e.g. when the committee's role has not been confirmed): no role section then.
  const role = focus.length === 0 ? null : (
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

  const pending = (
    <ComingSoon {...comingSoon} variant="section" icon={icon ?? "users"} headingLevel={role ? 2 : 3}>
      {showProfileNote && (
        <p className="empty-state__note">
          Each profile will show a photograph, full name, official designation, state and a short biography.
        </p>
      )}
    </ComingSoon>
  );

  if (!role) {
    return (
      <section aria-labelledby="members-heading" className="narrow">
        <h2 id="members-heading" className="section-title">
          Committee members
        </h2>
        {pending}
        {children}
      </section>
    );
  }

  return (
    <div className="split">
      {role}
      {pending}
    </div>
  );
}
