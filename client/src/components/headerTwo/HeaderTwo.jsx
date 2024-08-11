import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header-two.css";

const HeaderTwo = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleToggleNav = () => {
    setToggleNav((prevToggleNav) => {
      return !prevToggleNav;
    });
  };

  const { username, email } = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header-two__container">
      <div>
        <a className="header-two__link" href="/">
          <p className="header-two__title">HASH</p>
        </a>
      </div>
      <div className="header-two__account-wrapper">
        <div className="header-two__account">
          <div className="header-two__account-details">
            <h4 className="header-two__account-username">{username}</h4>
            <p className="header-two__account-email">{email}</p>
          </div>
          <div>
            <img
              className="header-two__user-icon"
              src="/userLogo.svg"
              alt="User"
            />
          </div>
        </div>
        <div>
          <button
            className="header-two__drop-down-btn"
            onClick={handleToggleNav}
          >
            <img
              className="header-two__drop-down-icon"
              src="/dropDown.svg"
              alt="Drop Down"
            />
          </button>
        </div>
        {toggleNav && (
          <div className="header-two__pop-up">
            <button
              className="header-two__pop-up-btn | btn"
              onClick={handleLogOut}
            >
              Log out
            </button>
            <Link className="header-two__pop-up-link | btn" to="/about">
              About
            </Link>
            <div className="header-two__close-btn-wrapper">
              <button
                className="header-two__close-btn"
                type="button"
                onClick={handleToggleNav}
              >
                <img
                  className="header-two__close-icon"
                  src="/hamClose.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        )}
      </div>
      {toggleNav && <div className="header-two__disable"></div>}
    </div>
  );
};

export default HeaderTwo;
