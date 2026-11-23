import { stateAssociations, states, unionTerritories, type Region } from "@/content/states";
import { published } from "@/lib/content-status";
import type { StateAssociation } from "@/lib/types";
import { IndiaMap } from "@/components/sections/organisation/IndiaMap";

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
 * verified state associations (hidden until at least one is published).
 */
export function StateDirectory() {
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
    {/* Shown only once verified state associations are published; no placeholder otherwise. */}
    {entries.length > 0 && (
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
              {entries.map((e) => (
                <StateRow key={e.state} entry={e} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )}
    </>
  );
}
