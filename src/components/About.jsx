import { profile } from "../data/content";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-bento">
          <div className="about-text">
            {profile.about.map(function(para, i) {
              return <p key={i}>{para}</p>;
            })}
          </div>
          <div className="about-photo">
            <img src="/images/kollene-photo.png" alt={profile.name} loading="lazy" />
          </div>
          <div className="about-cards">
            <div className="about-card">
              <h3>Details</h3>
              <div className="detail-row">
                <span className="detail-label">Course</span>
                <span className="detail-value">{profile.course}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Section</span>
                <span className="detail-value">{profile.section}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Student ID</span>
                <span className="detail-value">{profile.studentId}</span>
              </div>
            </div>
            <div className="about-card">
              <h3>Interests</h3>
              <ul className="interests-list">
                {profile.interests.map(function(item, i) {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
            <div className="about-card">
              <h3>Contact</h3>
              <p className="about-email">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
