import aboutHero from "../assets/abouthero.png";

export default function About() {
  return (
    <div className="about">
      {/* Hero section */}
      <section className="about-hero">
        <div className="about-hero-left">
          <img src={aboutHero} alt="Green eucalyptus leaves" />
        </div>

        <div className="about-hero-right">
          <h1>About Flower Plants</h1>
          <p className="about-sub">
            A digital space for plant lovers who want to grow with confidence.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="about-intro">
        <p>
          Flower Plants is a community-driven platform designed for individuals
          interested in indoor and outdoor gardening, plant care, and sustainable living.
          Whether you are a beginner starting your first plant or an experienced
          gardener managing a large collection, our goal is to make plant care
          simple, accessible, and enjoyable.
        </p>
      </section>

      {/* Vision / Mission / Purpose */}
      <section className="about-grid">
        <div className="about-card">
          <h2>Vision</h2>
          <p>
            Our vision is to create a world where plant care feels intuitive and
            achievable for everyone. We aim to inspire sustainable habits and
            encourage more people to connect with nature through plants.
          </p>
        </div>

        <div className="about-card">
          <h2>Mission</h2>
          <p>
            Our mission is to provide structured plant care guides and a
            user-friendly digital tool that helps users organize, monitor,
            and improve their personal plant collections.
          </p>
        </div>

        <div className="about-card">
          <h2>Purpose</h2>
          <p>
            Flower Plants exists to simplify plant care management. By combining
            educational content with personal collection management, we support
            plant owners at every experience level.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-inner">
          <h2>Our Core Values</h2>
          <ul>
            <li>
              <h3>Simplicity</h3>
              <p>Clear, easy-to-understand care guidance</p>
            </li>

            <li>
              <h3>Sustainability</h3>
              <p>Encouraging mindful plant ownership</p>
            </li>

            <li>
              <h3>Accessibility</h3>
              <p>A tool designed for beginners and experts alike</p>
            </li>

            <li>
              <h3>Community</h3>
              <p>Growing knowledge together</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}