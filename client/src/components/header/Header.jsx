import React, { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [toggleHam, setToggleHam] = useState(false);

  const handleToggleHam = () => {
    setToggleHam((prevToggleHam) => {
      return !prevToggleHam;
    });
  };

  const body = document.querySelector("body");
  useEffect(() => {
    toggleHam
      ? (body.style.overflowY = "hidden")
      : (body.style.overflowY = "auto");
  }, [toggleHam]);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <a className="header__link" href="/">
        <p className="header__title">HASH</p>
      </a>
      <ul className="header__ul">
        <li>
          <a className="header__about-btn | btn btn--clr-bg" href="/about">
            About
          </a>
        </li>
        {!user ? (
          <li>
            <a className="header__login-btn | btn btn--border" href="/login">
              Login
            </a>
          </li>
        ) : (
          <>
            <li>
              <div className="header-two__account">
                <div className="header-two__account-details">
                  <h4 className="header-two__account-username">
                    {user.username}
                  </h4>
                  <p className="header-two__account-email">{user.email}</p>
                </div>
                <div>
                  <img
                    className="header-two__user-icon"
                    src="/userLogo.svg"
                    alt="User"
                  />
                </div>
              </div>
            </li>
          </>
        )}
      </ul>
      <button className="header__menu-btn" onClick={handleToggleHam}>
        {toggleHam ? (
          <img
            className="header__hamburger"
            src="/hamClose.svg"
            alt="Close Menu"
          />
        ) : (
          <img
            className="header__hamburger"
            src="/hamOpen.svg"
            alt="Open Menu"
          />
        )}
      </button>
      {toggleHam && (
        <div className="mobile-nav">
          <ul className="mobile-nav__ul">
            <li>
              <a className="header__about-btn | btn btn--clr-bg" href="/about">
                About
              </a>
            </li>
            <li>
              <a className="header__login-btn | btn btn--border" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
