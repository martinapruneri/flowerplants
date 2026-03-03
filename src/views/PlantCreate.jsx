import { useState } from "react";

import emptySun from "../assets/emptysun.png";
import fullSun from "../assets/fullsun.png";
import emptyDrop from "../assets/emptydrop.png";
import fullDrop from "../assets/fulldrop.png";
import vaseIcon from "../assets/vase.png";
import smileIcon from "../assets/smile.png";

function RatingPicker({ value, onChange, fullIcon, emptyIcon, ariaLabel }) {
  const handlePick = (n) => {
    onChange(value === n ? 0 : n);
  };

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

export default function Create({ onClose, onCreate }) {
  const [imgData, setImgData] = useState(null);

  const [name, setName] = useState("");
  const [scientific, setScientific] = useState("");

  const [light, setLight] = useState(0);
  const [water, setWater] = useState(0);

  const [soil, setSoil] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [notes, setNotes] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setImgData(reader.result);
    reader.readAsDataURL(file);
  };

  const createPlant = () => {
    const trimmedName = name.trim();
    const trimmedScientific = scientific.trim();
    if (!trimmedName || !trimmedScientific) return;

    const newPlant = {
      id: crypto.randomUUID(),
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
      createdAt: new Date().toISOString(),
    };

    onCreate?.(newPlant);
    onClose?.();
  };

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-popup create-popup" onClick={(e) => e.stopPropagation()}>
        <div className="filter-title">
          <h3>Add a plant</h3>
        </div>

        <div className="popup-body">
          {/* UPLOAD */}
          <div className="filter-block">
            <div className="filter-label-small">Upload picture</div>

            <div className="create-upload-row">
              <label className="create-upload-btn">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
                Choose file
              </label>

              <div className="create-upload-hint">
                {imgData ? "Image selected" : "No image selected"}
              </div>
            </div>

            {imgData && (
              <div className="create-preview">
                <img src={imgData} alt="Plant preview" />
                <button
                  type="button"
                  className="filter-btn filter-secondary-btn"
                  onClick={() => setImgData(null)}
                  style={{ marginTop: "0.8rem" }}
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {/* NAME */}
          <div className="filter-block">
            <div className="filter-label-small">Name</div>
            <input
              className="create-input"
              type="text"
              placeholder="Plant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* SCIENTIFIC */}
          <div className="filter-block">
            <div className="filter-label-small">Scientific name</div>
            <input
              className="create-input"
              type="text"
              placeholder="Scientific name"
              value={scientific}
              onChange={(e) => setScientific(e.target.value)}
            />
          </div>

          {/* LIGHT */}
          <div className="filter-block">
            <div className="filter-label-small">Light</div>
            <RatingPicker
              value={light}
              onChange={setLight}
              fullIcon={fullSun}
              emptyIcon={emptySun}
              ariaLabel="Select light level"
            />
          </div>

          {/* WATER */}
          <div className="filter-block">
            <div className="filter-label-small">Water</div>
            <RatingPicker
              value={water}
              onChange={setWater}
              fullIcon={fullDrop}
              emptyIcon={emptyDrop}
              ariaLabel="Select water level"
            />
          </div>

          {/* SOIL */}
          <div className="filter-block">
            <div className="filter-label-small">Soil</div>

            <div className="create-soil-row">
              <img className="create-soil-icon" src={vaseIcon} alt="" aria-hidden="true" />
              <input
                className="create-input"
                type="text"
                placeholder="Soil type"
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
              />
            </div>
          </div>

          {/* DIFFICULTY */}
          <div className="filter-block">
            <div className="filter-label-small">Difficulty</div>

            <div className="filter-difficulty-row">
              <img
                className="filter-difficulty-icon"
                src={smileIcon}
                alt=""
                aria-hidden="true"
              />

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

          {/* NOTES */}
          <div className="filter-block">
            <div className="filter-label-small">Additional notes</div>
            <textarea
              className="create-textarea"
              placeholder="Anything you want to remember…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* ACTIONS */}
          <div className="filter-actions">
            <button
              type="button"
              className="filter-btn filter-secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="filter-btn filter-close-btn"
              onClick={createPlant}
              disabled={!name.trim() || !scientific.trim() || !difficulty}
              aria-disabled={!name.trim() || !scientific.trim()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}