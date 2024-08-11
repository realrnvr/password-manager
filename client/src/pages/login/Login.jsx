import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const login = () => {
  const [toggleHam, setToggleHam] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => {
      return !prevShowPassword;
    });
  };

  const handleToggleHam = () => {
    setToggleHam((prevToggleHam) => {
      return !prevToggleHam;
    });
  };

  const validateFormFill = (obj) => {
    const objArray = Object.values(obj);
    let isTrue = false;
    for (let i = 0; i < objArray.length; i++) {
      if (!objArray[i]) {
        isTrue = true;
      }
    }
    return isTrue;
  };

  useEffect(() => {
    setIsDisable(validateFormFill(formData));
  }, [formData]);

  const handleFormData = (e) => {
    setFormData((prevFormData) => {
      const { name, value } = e.target;
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/auth/login`,
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/manager");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setErrorMsg(error.response.data.msg);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <section className="login | container">
      <header className="login__header">
        <div>
          <a className="login__header-link" href="/">
            <p className="login__header-title">HASH</p>
          </a>
        </div>
        <div>
          <button className="login__header-btn" onClick={handleToggleHam}>
            {toggleHam ? (
              <img
                className="login__header-img"
                src="/hamClose.svg"
                alt="Close Menu"
              />
            ) : (
              <img
                className="login__header-img"
                src="/hamOpen.svg"
                alt="Open Menu"
              />
            )}
          </button>
        </div>
      </header>
      {toggleHam && (
        <div className="login__ham-menu-wrapper">
          <div className="login__ham-menu">
            <button className="login__ham-btn" onClick={handleToggleHam}>
              <img
                className="login__ham-img"
                src="/hamClose.svg"
                alt="Close Menu"
              />
            </button>
            <a className="login__mobile-nav-btn | btn" href="/">
              Home
            </a>
            <a className="login__mobile-nav-btn | btn" href="/about">
              About
            </a>
          </div>
        </div>
      )}
      <form className="login__form" onSubmit={handleFormSubmit}>
        <div className="login__form-conatiner">
          <h2 className="login__title">Log In</h2>
          <div className="login__input-wrapper">
            <label className="login__label" htmlFor="email">
              Email
            </label>
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              onChange={handleFormData}
              value={formData.email}
            />
          </div>
          <div className="login__input-wrapper">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <div className="login__password-input-wrapper">
              <input
                className="login__input login__input--width-padding"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleFormData}
                value={formData.password}
              />
              <div className="login__input-icon-wrapper">
                <button
                  type="button"
                  className="login__input-icon-btn"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <img
                      className="login__input-icon"
                      src="/eyeOpen.svg"
                      alt="Password"
                    />
                  ) : (
                    <img
                      className="login__input-icon"
                      src="/eyeClose.svg"
                      alt="Password"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          {errorMsg && (
            <div className="login__error-msg-wrapper">
              <p className="login__error-msg">{errorMsg}</p>
            </div>
          )}
          <div className="login__bottom-wrapper">
            <button
              className="login__btn | btn btn--clr-bg"
              type="sumbit"
              disabled={isDisable}
            >
              Log In
            </button>
            <div className="login__para-link-wrapper">
              <p className="login__para-link">Don't have an account yet?</p>
              <a className="login__link" href="/register">
                Register
              </a>
            </div>
          </div>
          {toggleHam && <div className="login__form-disable"></div>}
        </div>
      </form>
    </section>
  );
};

export default login;
