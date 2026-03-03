import { useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

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

function IconRating({ value, fullIcon, emptyIcon, ariaLabel }) {
  const v = Number(value) || 0;

  return (
    <div className="details-rating" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          className="filter-rate-icon"
          src={i < v ? fullIcon : emptyIcon}
          alt=""
          aria-hidden="true"
        />
      ))}
      <span className="filter-rate-value">{v}/5</span>
    </div>
  );
}

export default function PlantDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const plant = useMemo(() => {
    const plants = loadJson(STORAGE_KEY, []);
    if (!Array.isArray(plants)) return null;
    return plants.find((p) => p.id === id) ?? null;
  }, [id]);

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

  const guide = plant.guide ?? {};

  const handleDelete = () => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${plant.name}"?`
  );

  if (!confirmed) return;

  const plants = loadJson(STORAGE_KEY, []);
  if (!Array.isArray(plants)) return;

  const next = plants.filter((p) => p.id !== plant.id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  navigate("/my-plants");
};

  return (
    <div className="plant-details">

      <div className="details-breadcrumbs">
        <NavLink to="/my-plants">My Plants</NavLink>
        <span className="details-crumb-sep">&gt;</span>
        <span>{plant.name}</span>
      </div>

      <section className="details-top">
        <div className="details-green-box">
          <h1 className="details-name">{plant.name}</h1>
          <p className="details-scientific">{plant.scientific}</p>
        </div>

        <div className="details-image">
          {plant.img ? (
            <img src={plant.img} alt={plant.name} />
          ) : (
            <div className="details-image-placeholder">No image</div>
          )}
        </div>
      </section>

      <section className="details-grid">
        {/* LIGHT */}
        <div className="details-card">
          <div className="filter-label-small">Light</div>
          <IconRating
            value={guide.light}
            fullIcon={fullSun}
            emptyIcon={emptySun}
            ariaLabel="Light level"
          />
        </div>

        {/* WATER */}
        <div className="details-card">
          <div className="filter-label-small">Water</div>
          <IconRating
            value={guide.water}
            fullIcon={fullDrop}
            emptyIcon={emptyDrop}
            ariaLabel="Water level"
          />
        </div>

        {/* SOIL */}
        <div className="details-card">
          <div className="filter-label-small">Soil</div>
          <div className="details-row">
            <img className="filter-difficulty-icon" src={vaseIcon} alt="" aria-hidden="true" />
            <span className="details-text">{guide.soil || "-"}</span>
          </div>
        </div>

        {/* DIFFICULTY */}
        <div className="details-card">
          <div className="filter-label-small">Difficulty</div>
          <div className="details-row">
            <img className="filter-difficulty-icon" src={smileIcon} alt="" aria-hidden="true" />
            <span className="details-text">{guide.difficulty || "-"}</span>
          </div>
        </div>
      </section>

      {/* PINK NOTES BOX */}
      <section className="details-notes">
        <div className="filter-label-small">Additional notes</div>
        <p className="details-notes-text">
          {plant.notes ? plant.notes : "No notes yet."}
        </p>
      </section>

      {/* BOTTOM BUTTONS */}
      <section className="details-actions">
        <button
          type="button"
          className="filter-btn filter-secondary-btn"
          onClick={() => navigate("/my-plants")}
        >
          ‹ Back to My Plants
        </button>

        <div className="details-actions-right">
          <button
            type="button"
            className="filter-btn filter-secondary-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            type="button"
            className="filter-btn filter-close-btn"
            onClick={() => navigate(`/my-plants/${plant.id}/edit`)}
          >
            Update
          </button>
        </div>
      </section>
    </div>
  );
}