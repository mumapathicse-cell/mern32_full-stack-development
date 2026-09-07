"use client";

import { FormEvent, useState } from "react";

const trustPoints = [
  ["01", "Verified with care", "Mobile and profile checks designed around real conversations."],
  ["02", "Privacy by choice", "Control your photos, contact preferences, and visibility."],
  ["03", "Family friendly", "A calm, respectful experience for individuals and families."],
];

const journey = ["Profile created", "Preferences set", "Matches found", "A meaningful hello"];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top"><span className="brand-mark">KK</span><span>Kandhan Kudil <em>Matrimony</em></span></a>
        <div className="nav-links"><a href="#why">Why us</a><a href="#journey">How it works</a><a href="#membership">Membership</a></div>
        <button className="text-button" type="button">Sign in <span aria-hidden="true">↗</span></button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <p className="eyebrow">A thoughtful beginning, close to home</p>
          <h1>Where hearts meet,<br /><i>families connect.</i></h1>
          <p className="hero-copy">Meaningful matrimonial connections for individuals and families who value trust, clarity, and a little local understanding.</p>
          <form className="match-form" onSubmit={handleSubmit}>
            <label>Looking for<select defaultValue="Bride"><option>Bride</option><option>Groom</option></select></label>
            <label>Age range<select defaultValue="24 - 30"><option>24 - 30</option><option>28 - 34</option><option>30 - 38</option></select></label>
            <label>Location<select defaultValue="Salem"><option>Salem</option><option>Tamil Nadu</option><option>Anywhere</option></select></label>
            <button className="primary-button" type="submit">Find your match <span aria-hidden="true">→</span></button>
          </form>
          {submitted && <p className="form-note" role="status">Search preferences noted. Profile discovery will be connected next.</p>}
          <a className="quiet-link" href="#journey">Create a free profile <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-note">Salem rooted<br />Family minded</div>
      </section>

      <section className="trust shell" id="why">
        <div className="section-intro"><p className="eyebrow">The Kandhan Kudil difference</p><h2>A more considered way to meet.</h2></div>
        <div className="trust-grid">{trustPoints.map(([number, title, copy]) => <article className="trust-item" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="journey-band" id="journey"><div className="shell journey-layout"><div><p className="eyebrow">Your match journey</p><h2>Start with what<br /><i>matters to you.</i></h2><p className="body-copy">A clear path from your first details to a conversation worth having. You stay in control at every step.</p><a className="dark-link" href="#membership">Explore the experience <span aria-hidden="true">→</span></a></div><div className="journey-steps">{journey.map((step, index) => <div className="journey-step" key={step}><span>0{index + 1}</span><strong>{step}</strong><b aria-hidden="true">{index === journey.length - 1 ? "✓" : "→"}</b></div>)}</div></div></section>

      <section className="local-service"><div className="shell local-service-layout"><div><p className="eyebrow">திருமண சேவை மையம்</p><h2>Guidance for a<br /><i>meaningful beginning.</i></h2><p className="body-copy">ஜாதகத் தகவல்கள், குடும்ப ஆலோசனை, மற்றும் பொருத்தமான வரன்களைத் தேடும் பயணத்தில் எங்கள் குழு உங்களுக்கு உதவும்.</p></div><div className="service-details"><p className="service-label">We can help you with</p><ul><li>Horoscope details and preference guidance</li><li>Profile registration and updates</li><li>Family-friendly matrimonial assistance</li></ul><a className="service-phone" href="tel:+917904280819">Call 79042 80819 <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="membership shell" id="membership"><div><p className="eyebrow">Membership</p><h2>Keep your options<br /><i>open, honestly.</i></h2></div><div className="membership-copy"><p className="body-copy">Begin with a free profile. When you are ready for more ways to connect, choose the plan that fits your pace. Prices and features will always be shown clearly.</p><button className="outline-button" type="button">View membership plans <span aria-hidden="true">↗</span></button></div></section>

      <footer className="footer"><div className="shell footer-layout"><div><a className="brand brand-light" href="#top"><span className="brand-mark">KK</span><span>Kandhan Kudil <em>Matrimony</em></span></a><p>Where hearts meet, families connect.</p></div><div className="footer-address"><p>43-F/121, Kandhankudil,<br />Ammapet, Salem, Tamil Nadu - 636003</p><span>© 2026 Kandhan Kudil Matrimony</span></div></div></footer>
    </main>
  );
}
