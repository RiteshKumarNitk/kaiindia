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
 * Regions are clickable shapes (data-region="<code>"); AssociateStatesExplorer handles selection
 * and highlighting. The state list and dropdown are the keyboard-accessible equivalents.
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
        aria-label="Map of India showing its states and union territories. Use the list or dropdown to choose a region."
        className="india-map__svg"
      >
        {map.locations.map((loc) => {
          const regions = regionsForMapId(loc.id);
          const kind = regions[0]?.kind ?? "state";
          const label = regions.map((r) => r.name).join(" / ") || loc.name;
          const target = regions[0]?.code ?? loc.id;
          return (
            // A plain group (not a link): clicking it never moves focus, so the browser never draws a
            // rectangular focus ring around the region's bounding box. Selection is handled by
            // AssociateStatesExplorer via data-region; keyboard users use the list or dropdown.
            <g key={loc.id} data-region={target} className={`india-map__region is-${kind}`}>
              <title>{label}</title>
              <path d={loc.path} />
            </g>
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
