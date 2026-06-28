import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-content">
          <p className="contact-text">
            I'm always open to discussing architecture, design collaborations, and
            new opportunities. Feel free to reach out.
          </p>
          <div className="contact-card">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href={`mailto:${profile.email}`} className="contact-value">
                {profile.email}
              </a>
            </div>
          </div>
          <p className="contact-thankyou">
            Thank you for taking the time to explore my portfolio.
          </p>
        </div>
      </div>
      <div className="contact-footer">
        <div className="contact-footer-bg" />
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
    </section>
  );
}
