import { useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import emptySun from "../assets/emptysun.png";
import fullSun from "../assets/fullsun.png";
import emptyDrop from "../assets/emptydrop.png";
import fullDrop from "../assets/fulldrop.png";
import vaseIcon from "../assets/vase.png";
import smileIcon from "../assets/smile.png";

const STORAGE_KEY = "flowerplant_myPlants";

function loadJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function RatingPicker({ value, onChange, fullIcon, emptyIcon, ariaLabel }) {
  const handlePick = (n) => onChange(value === n ? 0 : n);

  return (
    <div className="filter-rating" role="radiogroup" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const filled = n <= value;

        return (
          <button
            key={n}
            type="button"
            className="filter-rate-btn"
            onClick={() => handlePick(n)}
            aria-checked={value === n}
            role="radio"
            title={`${n}/5`}
          >
            <img
              className="filter-rate-icon"
              src={filled ? fullIcon : emptyIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        );
      })}
      <span className="filter-rate-value">{value}/5</span>
    </div>
  );
}

export default function PlantEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const plant = useMemo(() => {
    const plants = loadJson(STORAGE_KEY, []);
    if (!Array.isArray(plants)) return null;
    return plants.find((p) => p.id === id) ?? null;
  }, [id]);

  // If not found
  if (!plant) {
    return (
      <div className="plant-details">
        <div className="details-breadcrumbs">
          <NavLink to="/my-plants">My Plants</NavLink>
          <span className="details-crumb-sep">&gt;</span>
          <span>Not found</span>
        </div>

        <h1>Plant not found</h1>
        <p>This plant may have been deleted or your local storage was cleared.</p>
        <NavLink to="/my-plants">← Back to My Plants</NavLink>
      </div>
    );
  }

  // Prefill form state
  const g = plant.guide ?? {};

  const [imgData, setImgData] = useState(plant.img ?? null);
  const [name, setName] = useState(plant.name ?? "");
  const [scientific, setScientific] = useState(plant.scientific ?? "");

  const [light, setLight] = useState(g.light ?? 0);
  const [water, setWater] = useState(g.water ?? 0);

  const [soil, setSoil] = useState(g.soil ?? "");
  const [difficulty, setDifficulty] = useState(g.difficulty ?? "");

  const [notes, setNotes] = useState(plant.notes ?? "");

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setImgData(reader.result);
    reader.readAsDataURL(file);
  };

  const save = () => {
    const trimmedName = name.trim();
    const trimmedScientific = scientific.trim();

    if (!trimmedName || !trimmedScientific || !difficulty) return;

    const updatedPlant = {
      ...plant,
      name: trimmedName,
      scientific: trimmedScientific,
      img: imgData,
      guide: {
        light,
        water,
        soil: soil.trim(),
        difficulty,
      },
      notes: notes.trim(),
      updatedAt: new Date().toISOString(),
    };

    const plants = loadJson(STORAGE_KEY, []);
    if (!Array.isArray(plants)) return;

    const next = plants.map((p) => (p.id === plant.id ? updatedPlant : p));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    navigate(`/my-plants/${plant.id}`);
  };

  const canSave = name.trim() && scientific.trim() && difficulty;

  return (
    <div className="plant-details">
      {/* Breadcrumbs */}
      <div className="details-breadcrumbs">
        <NavLink to="/my-plants">My Plants</NavLink>
        <span className="details-crumb-sep">&gt;</span>
        <NavLink to={`/my-plants/${plant.id}`}>{plant.name}</NavLink>
        <span className="details-crumb-sep">&gt;</span>
        <span>Update</span>
      </div>

      <section className="details-top">
        <div className="details-green-box">
          <div className="filter-label-small" style={{ color: "rgba(255,255,255,0.8)" }}>
            Plant name
          </div>
          <input
            className="create-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Plant name"
          />

          <div
            className="filter-label-small"
            style={{ color: "rgba(255,255,255,0.8)", marginTop: "1rem" }}
          >
            Scientific name
          </div>
          <input
            className="create-input"
            type="text"
            value={scientific}
            onChange={(e) => setScientific(e.target.value)}
            placeholder="Scientific name"
          />
        </div>

<div className="details-image">
  {imgData ? (
    <img src={imgData} alt={name || "Plant"} />
  ) : (
    <div className="details-image-placeholder">No image</div>
  )}

  <div className="details-image-tools">
    <label className="create-upload-btn">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      Choose file
    </label>

    <button
      type="button"
      className="filter-btn filter-secondary-btn"
      onClick={() => setImgData(null)}
      disabled={!imgData}
      aria-disabled={!imgData}
    >
      Remove image
    </button>
  </div>
</div>
      </section>

      <section className="details-grid">
        <div className="details-card">
          <div className="filter-label-small">Light</div>
          <RatingPicker
            value={light}
            onChange={setLight}
            fullIcon={fullSun}
            emptyIcon={emptySun}
            ariaLabel="Select light level"
          />
        </div>

        <div className="details-card">
          <div className="filter-label-small">Water</div>
          <RatingPicker
            value={water}
            onChange={setWater}
            fullIcon={fullDrop}
            emptyIcon={emptyDrop}
            ariaLabel="Select water level"
          />
        </div>

        <div className="details-card">
          <div className="filter-label-small">Soil</div>
          <div className="details-row">
            <img className="filter-difficulty-icon" src={vaseIcon} alt="" aria-hidden="true" />
            <input
              className="create-input"
              type="text"
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              placeholder="Soil type"
            />
          </div>
        </div>

        <div className="details-card">
          <div className="filter-label-small">Difficulty</div>
          <div className="details-row">
            <img className="filter-difficulty-icon" src={smileIcon} alt="" aria-hidden="true" />
            <select
              className="filter-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="" disabled>
                Difficulty level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </section>

      <section className="details-notes">
        <div className="filter-label-small">Additional notes</div>
        <textarea
          className="create-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything you want to remember…"
          rows={4}
        />
      </section>

      {/* Bottom actions */}
      <section className="details-actions">
        <button
          type="button"
          className="filter-btn filter-secondary-btn"
          onClick={() => navigate(`/my-plants/${plant.id}`)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="filter-btn filter-close-btn"
          onClick={save}
          disabled={!canSave}
          aria-disabled={!canSave}
        >
          Save changes
        </button>
      </section>
    </div>
  );
}