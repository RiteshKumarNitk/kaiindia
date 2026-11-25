"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import type { Region } from "@/content/states";
import type { StateAssociation } from "@/lib/types";
import { StateAssociationDetails } from "./StateAssociationDetails";

type Props = {
  states: Region[];
  unionTerritories: Region[];
  associations: Record<string, StateAssociation>;
  /** Server-rendered SVG map whose regions carry data-region="<code>". */
  map: ReactNode;
};

const PARAM = "state";

/** Reads the selected code from ?state=hr, or from a legacy #region-hr link. */
function readCodeFromLocation(valid: Set<string>): string | null {
  const fromQuery = new URLSearchParams(window.location.search).get(PARAM)?.toLowerCase() ?? null;
  if (fromQuery && valid.has(fromQuery)) return fromQuery;
  const hash = window.location.hash.match(/^#region-([a-z]+)$/)?.[1] ?? null;
  return hash && valid.has(hash) ? hash : null;
}

/**
 * Associate States explorer. One source of truth — `selected` — shared by the map, the
 * state/UT list, the mobile dropdown and the details panel, mirrored in the URL (?state=hr).
 * Uses window.history (integrated with the Next.js router), so back/forward work and the page
 * never reloads.
 */
export function AssociateStatesExplorer({ states, unionTerritories, associations, map }: Props) {
  const all = [...states, ...unionTerritories];
  const valid = useRef(new Set(all.map((r) => r.code))).current;
  const [selected, setSelected] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const published = all.filter((r) => associations[r.code]?.status === "published");

  // Initial selection from the URL, legacy hash links, and back/forward navigation.
  useEffect(() => {
    const sync = () => setSelected(readCodeFromLocation(valid));
    sync();
    const legacy = window.location.hash.match(/^#region-([a-z]+)$/)?.[1];
    if (legacy && valid.has(legacy)) window.history.replaceState(null, "", `?${PARAM}=${legacy}`);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [valid]);

  const select = useCallback(
    (code: string, reveal = true) => {
      if (!valid.has(code)) return;
      setSelected(code);
      if (new URLSearchParams(window.location.search).get(PARAM) !== code) {
        window.history.pushState(null, "", `?${PARAM}=${code}`);
      }
      if (reveal) {
        requestAnimationFrame(() => {
          const el = detailsRef.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.top < 0 || r.top > window.innerHeight - 120) {
            const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
          }
        });
      }
    },
    [valid],
  );

  // Clicks on the server-rendered map: find the region shape that was clicked.
  const onMapClick = (e: MouseEvent<HTMLDivElement>) => {
    const code = (e.target as Element).closest<SVGElement>("[data-region]")?.dataset.region;
    if (code) select(code);
  };

  const region = selected ? all.find((r) => r.code === selected) : undefined;
  // Ladakh shares the Jammu & Kashmir outline in the map data.
  const mapCode = selected === "la" ? "jk" : selected;

  const list = (title: string, regions: Region[]) => {
    const id = `regions-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return (
      <section aria-labelledby={id} className="region-group">
        <h3 id={id} className="region-group__title">
          {title} <span className="region-group__count">{regions.length}</span>
        </h3>
        <ul className="region-list">
          {regions.map((r) => {
            const live = associations[r.code]?.status === "published";
            return (
              <li key={r.code} id={`region-${r.code}`} className={`region is-${r.kind}${selected === r.code ? " is-selected" : ""}`}>
                <button type="button" className="region__button" aria-pressed={selected === r.code} onClick={() => select(r.code)}>
                  <span className="region__name">{r.name}</span>
                  {live && <span className="region__badge">Association details</span>}
                  {r.mapNote && <span className="region__note">{r.mapNote}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  };

  return (
    <div className="explorer" data-selected={mapCode ?? undefined}>
      {/* Selected-region highlight: codes come from a fixed allow-list, never from user text. */}
      {mapCode && valid.has(mapCode) && (
        <style>{`.explorer .india-map__region[data-region="${mapCode}"] path{fill:var(--navy);stroke:var(--accent);stroke-width:1.6}`}</style>
      )}

      <div className="explorer__picker">
        <label htmlFor="state-picker">Choose a state or union territory</label>
        <select
          id="state-picker"
          value={selected ?? ""}
          onChange={(e) => e.target.value && select(e.target.value)}
        >
          <option value="">Select…</option>
          <optgroup label="States">
            {states.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Union Territories">
            {unionTerritories.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="explorer__map" onClick={onMapClick}>
        {map}
      </div>

      <div className="explorer__lists">
        {list("States", states)}
        {list("Union Territories", unionTerritories)}
      </div>

      <div className="explorer__details" ref={detailsRef} aria-live="polite" tabIndex={-1}>
        <h2 className="section-title">State Association Details</h2>
        {region && associations[region.code] ? (
          <StateAssociationDetails region={region} association={associations[region.code]} />
        ) : (
          <div className="assoc assoc--empty">
            <p>Select a state or union territory on the map or from the list to see its association details.</p>
            {published.length > 0 && (
              <>
                <p className="assoc__label">Association details published for</p>
                <ul className="assoc__chips">
                  {published.map((r) => (
                    <li key={r.code}>
                      <button type="button" onClick={() => select(r.code)}>
                        {r.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
