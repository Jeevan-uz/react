import "./app.css";

import { data } from "./data.jsx";

function Card({ plan, icon, price, period, description, isPopular, perks }) {
  return (
    <div className={`card ${isPopular ? "popular" : ""}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      <div className="card-header">
        <div className="plan-icon">
          <i className={icon} />
        </div>
        <h3>{plan}</h3>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">{price}</span>
          <span className="period">{period}</span>
        </div>
        <p className="description">{description}</p>
      </div>
      <div className="card-body">
        <ul className="features">
          {perks.map((perk) => (
            <li key={perk.name} className={perk.isEnabled ? "" : "disabled"}>
              <i
                className={perk.isEnabled ? "fas fa-check" : "fas fa-times"}
              ></i>
              {perk.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <button className={isPopular ? "btn btn-accent" : "btn"}>
          Get started
        </button>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <div className="container">
      <header>
        <h1>Choose Your Plan</h1>
        <p>Select the perfect pricing for your needs</p>
      </header>

      <div className="pricing-cards">
        {data.map((info) => (
          <Card {...info} key={info.id} />
        ))}
      </div>

      <div className="testimonimal">
        <div className="quote">
          <i className="fas fa-quote-left"></i>
          <p>
            Switching to this service was one of the best decisions we've made.
            The pricing is transparent and the features are exactly what we
            needed.
          </p>

          <div className="author">
            <div className="avatar">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Customer"
              ></img>
            </div>
            <div className="info">
              <h4>Sarah Johnson</h4>
              <p>Marketing Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
