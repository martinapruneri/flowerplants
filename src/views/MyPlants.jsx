import { useEffect, useMemo, useState } from "react";

import Search from "../components/Search";
import Filter from "./Filter";
import Create from "./PlantCreate";
import PlantList from "../components/PlantList";

import addIcon from "../assets/add.png";
import myplants1 from "../assets/myplants1.jpg";
import myplants2 from "../assets/myplants2.jpg";
import myplants3 from "../assets/myplants3.jpg";
import myplants4 from "../assets/myplants4.jpg";
import myplants5 from "../assets/myplants5.jpg";

const STORAGE_KEY = "flowerplant_myPlants";
const FILTERS_KEY = "flowerplant_myPlants_filters";

const DEFAULT_PLANTS = [
  {
    id: "seed-everlasting-pea",
    name: "Everlasting pea",
    scientific: "Lathyrus latifolius",
    img: myplants1,
    guide: { light: 4, water: 3, soil: "Well-draining, fertile soil", difficulty: "Intermediate" },
    notes: "Hardy perennial climber. Provide support and water regularly during flowering.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-linum-perenne",
    name: "Blue flax",
    scientific: "Linum perenne",
    img: myplants2,
    guide: { light: 5, water: 2, soil: "Light, well-draining soil", difficulty: "Beginner" },
    notes: "Prefers full sun. Avoid soggy soil.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-phalaenopsis",
    name: "Orchid",
    scientific: "Phalaenopsis (moth orchid)",
    img: myplants3,
    guide: { light: 3, water: 2, soil: "Orchid bark mix", difficulty: "Intermediate" },
    notes: "Bright indirect light. Water when medium is almost dry—avoid water sitting in the crown.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-sempervivum",
    name: "Houseleek",
    scientific: "Sempervivum",
    img: myplants4,
    guide: { light: 5, water: 1, soil: "Cactus / succulent mix", difficulty: "Beginner" },
    notes: "Very drought-tolerant. Best in gritty soil with excellent drainage.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-sedum-clavatum",
    name: "Club-Head Sedum",
    scientific: "Sedum clavatum",
    img: myplants5,
    guide: { light: 5, water: 1, soil: "Cactus / succulent mix", difficulty: "Beginner" },
    notes: "Let soil dry fully between waterings. Give lots of light for compact growth.",
    createdAt: new Date().toISOString(),
  },
];

function loadJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export default function MyPlants() {

  const [plants, setPlants] = useState(() => {
    const parsed = loadJson(STORAGE_KEY, null);
 
  if (!parsed) return DEFAULT_PLANTS;

  if (!Array.isArray(parsed)) return DEFAULT_PLANTS;

  return parsed;
  });

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [filters, setFilters] = useState(() =>
    loadJson(FILTERS_KEY, { light: 0, water: 0, difficulty: "" })
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  }, [filters]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return plants.filter((p) => {
      const matchesSearch =
        !q ||
        (p.name ?? "").toLowerCase().includes(q) ||
        (p.scientific ?? "").toLowerCase().includes(q);

      const g = p.guide ?? {};
      const matchesLight = !filters.light || (g.light ?? 0) >= filters.light;
      const matchesWater = !filters.water || (g.water ?? 0) >= filters.water;
      const matchesDifficulty =
        !filters.difficulty || (g.difficulty ?? "") === filters.difficulty;

      return matchesSearch && matchesLight && matchesWater && matchesDifficulty;
    });
  }, [plants, search, filters]);

  const handleOpenPlant = (id) => {
    alert(`Open plant: ${id}`);
  };

  return (
    <div className="myplants">
      <header className="myplants-header">
        <h1>My Plants</h1>
        <p className="myplants-sub">
          Manage your personal plant collection and keep track of their care needs.
        </p>

        <div className="myplants-intro">
          <p>This is your personal plant space.</p>
          <p>Add your plants, edit their care details, and keep everything organized in one place.</p>
          <p>
            Your collection is saved locally in your browser, so you can return anytime and continue
            managing your plants.
          </p>
        </div>
      </header>

      <div className="myplants-controls">
        <button
          className="myplants-add-btn"
          onClick={() => setShowCreate(true)}
          type="button"
        >
          <img src={addIcon} alt="" aria-hidden="true" />
          <span>Add plant</span>
        </button>

        <Search
          searchValue={search}
          onSearchChange={setSearch}
          onOpenFilters={() => setShowFilters(true)}
        />
      </div>

    <PlantList
      allPlantsCount={plants.length}
      plants={filtered}
      onOpenPlant={handleOpenPlant}
    />

      {showFilters && (
        <Filter
          onClose={() => setShowFilters(false)}
          onApply={(next) => setFilters(next)}
        />
      )}

      {showCreate && (
        <Create
          onClose={() => setShowCreate(false)}
          onCreate={(newPlant) => setPlants((prev) => [newPlant, ...prev])}
        />
      )}
    </div>
  );
}