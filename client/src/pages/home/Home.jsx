import React from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <header className="container">
        <Header />
      </header>
      <main>
        <section className="home | container">
          <div className="home__content-wrapper">
            <h1 className="home__title">
              Create, <br />
              Save <strong>PASSWORDS</strong> for your use!
            </h1>
            <img
              className="home__logo-img | sm-screen"
              src="/passLogo.png"
              alt="Logo"
            />
            <p className="home__description">
              Our platform securely saves all your passwords in one place,
              ensuring you never forget them. With our auto-generate feature,
              create strong, unique passwords for each account with a single
              click.
            </p>
            <Link
              className="home__btn | btn btn--clr-bg"
              to={user ? "/manager" : "/register"}
            >
              {user ? "Manager" : "Register now"}
            </Link>
          </div>
          <div>
            <img
              className="home__logo-img | lg-screen"
              src="/passLogo.png"
              alt="Logo"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
