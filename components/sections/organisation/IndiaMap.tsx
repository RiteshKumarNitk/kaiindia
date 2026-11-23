import india from "@svg-maps/india";
import { regionsForMapId } from "@/content/states";
import { simplifyPolygonPath } from "@/lib/svg-path";

type MapData = { label: string; viewBox: string; locations: { id: string; name: string; path: string }[] };
const source = india as unknown as MapData;

/* Simplified once per build: ~0.1-unit precision is plenty for a 612-unit map shown at ~400px. */
const map: MapData = {
  ...source,
  locations: source.locations.map((l) => ({ ...l, path: simplifyPolygonPath(l.path) })),
};

/**
 * Static, server-rendered map of India's states and union territories.
 * Each region links to its entry in the list beside it. The list is the accessible
 * equivalent, so map links are removed from the tab order.
 *
 * Map data: @svg-maps/india by Victor Cazanave, licensed CC BY 4.0
 * (https://github.com/VictorCazanave/svg-maps). Modified: recoloured, linked, relabelled.
 */
export function IndiaMap() {
  return (
    <figure className="india-map">
      <svg
        viewBox={map.viewBox}
        role="img"
        aria-label="Map of India showing its states and union territories"
        className="india-map__svg"
      >
        {map.locations.map((loc) => {
          const regions = regionsForMapId(loc.id);
          const kind = regions[0]?.kind ?? "state";
          const label = regions.map((r) => r.name).join(" / ") || loc.name;
          const target = regions[0]?.code ?? loc.id;
          return (
            <a key={loc.id} href={`#region-${target}`} tabIndex={-1} className={`india-map__region is-${kind}`}>
              <title>{label}</title>
              <path d={loc.path} />
            </a>
          );
        })}
      </svg>
      <figcaption className="india-map__caption">
        <span className="india-map__key">
          <i className="is-state" aria-hidden="true" /> State
        </span>
        <span className="india-map__key">
          <i className="is-ut" aria-hidden="true" /> Union territory
        </span>
        {/* <span className="india-map__credit">
          Map:{" "}
          <a href="https://github.com/VictorCazanave/svg-maps" rel="noopener noreferrer" target="_blank">
            svg-maps
          </a>{" "}
          by Victor Cazanave,{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener noreferrer" target="_blank">
            CC BY 4.0
          </a>
          , recoloured. Not to scale.
        </span> */}
      </figcaption>
    </figure>
  );
}
