import { MemberCard } from "@/components/sections/committee/MemberDirectory";
import { Icon } from "@/components/ui/Icon";
import { committees, executiveRoles } from "@/content/people";
import { published } from "@/lib/content-status";
import type { CommitteeMember } from "@/lib/types";

/** Card for a designated position whose holder has not been supplied yet. No name or photo is invented. */
function VacantRoleCard({ role, text = "Member details will be updated soon." }: { role: string; text?: string }) {
  return (
    <article className="member-card member-card--vacant">
      <div className="member-card__photo member-card__photo--vacant" aria-hidden="true">
        <Icon name="user" size={40} />
      </div>
      <div className="member-card__body">
        <p className="member-card__role">{role}</p>
        <p className="member-card__pending">{text}</p>
      </div>
    </article>
  );
}

/**
 * Executive Members directory. Positions come from `executiveRoles` (content/people.ts), so
 * positions marked `alwaysShow` (e.g. Joint Secretary) are always listed, filled or not.
 */
export function ExecutiveDirectory() {
  const members = published(committees.executive);
  const known = new Set(executiveRoles.map((r) => r.title));

  const entries: ({ kind: "member"; member: CommitteeMember } | { kind: "vacant"; role: string; text?: string })[] = [];
  for (const role of executiveRoles) {
    const holders = members.filter((m) => m.designation === role.title);
    if (holders.length > 0) holders.forEach((member) => entries.push({ kind: "member", member }));
    else if (role.alwaysShow) entries.push({ kind: "vacant", role: role.title, text: role.vacantText });
  }
  // Any member whose designation is not in the role list is still shown, after the listed roles.
  members.filter((m) => !known.has(m.designation)).forEach((member) => entries.push({ kind: "member", member }));

  return (
    <section aria-labelledby="executive-heading">
      <h2 id="executive-heading" className="section-title">
        Office bearers and members
      </h2>
      <ol className="member-grid member-grid--list">
        {entries.map((e, i) => (
          <li key={e.kind === "member" ? `${e.member.name}-${e.member.designation}` : `vacant-${e.role}`}>
            {e.kind === "member" ? (
              <MemberCard member={e.member} priority={i < 4} />
            ) : (
              <VacantRoleCard role={e.role} text={e.text} />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
