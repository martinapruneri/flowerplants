import PlantItem from "./PlantItem";

export default function PlantList({ allPlantsCount, plants, onOpenPlant }) {
  if (allPlantsCount === 0) {
    return (
      <section className="myplants-list">
        <div className="myplants-empty">
          <p><strong>You haven't added any plants yet.</strong></p>
          <p>Start by adding your first plant above and begin building your collection.</p>
        </div>
      </section>
    );
  }

  if (plants.length === 0) {
    return (
      <section className="myplants-list">
        <div className="myplants-empty">
          <p><strong>No plants found.</strong></p>
          <p>Try a different search or adjust your filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="myplants-list">
      <div className="myplants-grid">
        {plants.map((p) => (
          <PlantItem key={p.id} plant={p} onOpenPlant={onOpenPlant} />
        ))}
      </div>
    </section>
  );
}