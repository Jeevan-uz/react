import { data } from "./data.jsx";

function Member({ name, url, post, about }) {
  return (
    <div className="team-card">
      <div className="card-top">
        <div className="profile-bg"></div>
        <div className="profile-img">
          <img src={url} alt="Team Member"></img>
        </div>
        <h3>{name}</h3>
        <p className="role">{post}</p>
      </div>

      <div className="card-bottom">
        <p className="bio">{about}</p>
        <div className="social-links">
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="container">
      <header>
        <h1>Meet Your Team</h1>
        <p>
          We're a passionate group of professionals dedicated to delicering
          exceptional results
        </p>
      </header>
      <div className="team-grid">
        {data.map((person) => (
          <Member {...person} key={person.id} />
        ))}
      </div>

      <div className="team-cta">
        <h2>Want to join our team?</h2>
        <p>
          We're always looking for talented individuals to join our growing
          team.
        </p>
        <a href="#" className="cta-button">
          View Open Positions
        </a>
      </div>
    </div>
  );
}
