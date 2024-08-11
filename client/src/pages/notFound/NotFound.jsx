import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  return (
    <section className="not-found | container">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description not-found__description--fs">
          Page Not Found
        </p>
        <p className="not-found__description">
          we're sorry, the page you have requested could not be found
        </p>
        <p className="not-found__description">
          Please go back to the home page
        </p>
        <Link to="/" className="not-found__link | btn">
          Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
