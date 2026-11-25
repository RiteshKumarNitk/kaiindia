import { IndiaMap } from "@/components/sections/about/IndiaMap";
import { stateAssociations, states, unionTerritories } from "@/content/states";
import { AssociateStatesExplorer } from "./AssociateStatesExplorer";

/**
 * Associate States page body: interactive map + state/UT list + selected association details.
 * The map is rendered on the server and passed into the client explorer, which owns selection.
 */
export function StateDirectory() {
  return (
    <section aria-labelledby="regions-heading" className="regions">
      <div className="regions__head">
        <h2 id="regions-heading" className="section-title">
          States and Union Territories of India
        </h2>
        <p className="muted">
          India has {states.length} states and {unionTerritories.length} union territories. Select a region on the map,
          from the list or from the dropdown to see its state karate association.
        </p>
      </div>
      <AssociateStatesExplorer
        states={states}
        unionTerritories={unionTerritories}
        associations={stateAssociations}
        map={<IndiaMap />}
      />
    </section>
  );
}
