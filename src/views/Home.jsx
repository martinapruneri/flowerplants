import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import heroImg from "../assets/hero.png";
import card1 from "../assets/homecard1.jpg";
import card2 from "../assets/homecard2.jpg";
import card3 from "../assets/homecard3.jpg";
import card4 from "../assets/homecard4.jpg";
import card5 from "../assets/homecard5.jpg";
import card6 from "../assets/homecard6.jpg";

import emptySun from "../assets/whiteemptysun.png";
import fullSun from "../assets/whitefullsun.png";
import emptyDrop from "../assets/whiteemptydrop.png";
import fullDrop from "../assets/whitefulldrop.png";
import vaseIcon from "../assets/whitevase.png";
import smileIcon from "../assets/whitesmile.png";


const popularPlants = [
  {
    id: 1,
    img: card1,
    name: "Elephant Ear",
    scientific: "Caladium splendens",
    guide: { light: 4, water: 3, soil: "Well-draining potting mix", difficulty: "Intermediate" },
  },
  {
    id: 2,
    img: card2,
    name: "Tulips",
    scientific: "Tulipa gesneriana",
    guide: { light: 5, water: 2, soil: "Sandy / well-draining soil", difficulty: "Beginner" },
  },
  {
    id: 3,
    img: card3,
    name: "Aloe",
    scientific: "Aloe brevifolia",
    guide: { light: 5, water: 1, soil: "Cactus / succulent mix", difficulty: "Beginner" },
  },
  {
    id: 4,
    img: card4,
    name: "Lavender",
    scientific: "Lavandula",
    guide: { light: 5, water: 1, soil: "Sandy / gritty soil", difficulty: "Intermediate" },
  },
  {
    id: 5,
    img: card5,
    name: "Bleeding hearts",
    scientific: "Dicentra spectabilis",
    guide: { light: 3, water: 3, soil: "Moist, rich soil", difficulty: "Intermediate" },
  },
  {
    id: 6,
    img: card6,
    name: "Water lilies",
    scientific: "Nymphaea",
    guide: { light: 5, water: 5, soil: "Aquatic planting soil", difficulty: "Expert" },
  },
];

function IconRating({ value, fullIcon, emptyIcon }) {
  return (
    <div className="guide-icons">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          className="rate-icon"
          src={i < value ? fullIcon : emptyIcon}
          alt=""
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Home() {
  const viewportRef = useRef(null);

  // carousel sizing
  const cardWidth = 340;
  const gap = 40;
  const step = cardWidth + gap;

  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // flip state
  const [flipped, setFlipped] = useState(() => new Set());

  const toggleFlip = (id) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // calculate how many full cards fit in the viewport
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      const count = Math.max(1, Math.floor((w + gap) / step));
      setVisibleCount(count);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [gap, step]);

  const maxIndex = Math.max(0, popularPlants.length - visibleCount);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // keep index valid if the screen resizes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-left">
          <h1>Welcome to FlowerPlants</h1>
          <p className="home-hero-sub">
            Your digital home for plant care knowledge and personal plant collections.
          </p>

          <NavLink to="/my-plants" className="home-cta">
            Manage my plants
          </NavLink>
        </div>

        <div className="home-hero-right">
          <img src={heroImg} alt="FlowerPlant hero" />
        </div>
      </section>

      {/* INFO BAR */}
      <section className="home-info-bar">
        <p>
          FlowerPlants is a community-driven platform for plant lovers, curious beginners, and
          experienced gardeners. Whether you are growing your first houseplant or expanding your
          indoor jungle, we provide easy-to-understand care guides to help your plants thrive. Our
          mission is to make plant care simple, accessible, and inspiring. With structured care
          guides and the ability to manage your own plant collection, FlowerPlants supports you at
          every stage of your plant journey.
        </p>
      </section>

      {/* POPULAR PLANTS */}
      <section className="home-popular">
        <h2>Popular Plants</h2>

        <div className="carousel">
          <button className="carousel-btn" onClick={prev} disabled={index === 0} aria-label="Previous">
            ‹
          </button>

          <div className="carousel-viewport" ref={viewportRef}>
            <div className="carousel-track" style={{ transform: `translateX(-${index * step}px)` }}>
              {popularPlants.map((p) => {
                const isFlipped = flipped.has(p.id);

                return (
                  <article
                    key={p.id}
                    className={`plant-card flip-card ${isFlipped ? "is-flipped" : ""}`}
                    onClick={() => toggleFlip(p.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleFlip(p.id);
                    }}
                    aria-label={`Toggle guide for ${p.name}`}
                    title="Click to flip"
                  >
                    <div className="flip-inner">
                      {/* FRONT */}
                      <div className="flip-face flip-front">
                        <img className="card-bg" src={p.img} alt={p.name} />

                        <div className="card-overlay">
                          <div className="plant-card-name">{p.name}</div>
                          <div className="plant-card-scientific">{p.scientific}</div>
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="flip-face flip-back">
                        <div className="guide-wrap">
                          <div className="guide-title">
                            <div className="guide-name">{p.name}</div>
                            <div className="guide-scientific">{p.scientific}</div>
                          </div>

                          {/* LIGHT */}
                          <div className="guide-block">
                           <div className="guide-label-small">Light</div> 
                            <div className="guide-line">
                              <IconRating
                                value={p.guide.light}
                                fullIcon={fullSun}
                                emptyIcon={emptySun}
                              />
                              <span className="guide-value">{p.guide.light}/5</span>
                            </div>
                          </div>

                          {/* WATER */}
                          <div className="guide-block">
                            <div className="guide-label-small">Water</div>
                            <div className="guide-line">
                              <IconRating
                                value={p.guide.water}
                                fullIcon={fullDrop}
                                emptyIcon={emptyDrop}
                              />
                              <span className="guide-value">{p.guide.water}/5</span>
                            </div>
                          </div>

                          {/* SOIL */}
                          <div className="guide-block">
                            <div className="guide-label-small">Soil</div>
                            <div className="guide-line">
                              <img className="guide-icon" src={vaseIcon} alt="" aria-hidden="true" />
                              <span className="guide-value">{p.guide.soil}</span>
                            </div>
                          </div>

                          {/* DIFFICULTY */}
                          <div className="guide-block">
                            <div className="guide-label-small">Difficulty</div>
                            <div className="guide-line">
                              <img className="guide-icon" src={smileIcon} alt="" aria-hidden="true" />
                              <span className="guide-value">{p.guide.difficulty}</span>
                            </div>
                          </div>

                          <div className="guide-hint">Click to flip back</div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <button
            className="carousel-btn"
            onClick={next}
            disabled={index === maxIndex}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </section>

      {/* PLANT CARE 101 */}
      <section className="care-section">
        <div className="care-header">
          <h2>Plant Care 101</h2>
          <p>
            Taking care of plants does not have to be complicated. Most plants thrive when a few
            essential factors are balanced correctly:
          </p>
        </div>

        <div className="care-grid">
          <div className="care-card">
            <h3>Light</h3>
            <p>
              Different plants require different levels of light — from low indirect light to several
              hours of bright sunlight. Understanding your plant&apos;s natural habitat helps you
              recreate ideal conditions.
            </p>
          </div>

          <div className="care-card">
            <h3>Watering</h3>
            <p>
              Overwatering is one of the most common mistakes. Always check if the soil is dry before
              watering. Some plants prefer weekly watering, while others only need water every few
              weeks.
            </p>
          </div>

          <div className="care-card">
            <h3>Soil</h3>
            <p>
              Well-draining soil is essential for healthy roots. Cactus and succulent mixes drain
              quickly, while peat-based mixes retain more moisture.
            </p>
          </div>

          <div className="care-card">
            <h3>Difficulty Level</h3>
            <p>
              Some plants are beginner-friendly and resilient, while others require more precise care.
              Choose plants that match your experience level.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="community-section">
        <h2>Join a Growing Community</h2>

        <p>At FlowerPlants, we believe plants bring people together.</p>
        <p>
          By learning how to care for your plants and building your own collection, you become part of a
          sustainable and mindful lifestyle.
        </p>

        <NavLink to="/my-plants" className="community-cta">
          Start growing today!
        </NavLink>
      </section>
    </div>
  );
}