import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [toggleHam, setToggleHam] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

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

  const regsiterUser = async () => {
    try {
      setLoader(true);
      await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/auth/register`,
        formData
      );
      setLoader(false);
      navigate("/login");
    } catch (error) {
      setLoader(false);
      setErrorMsg(error.response.data.msg);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    regsiterUser();
  };

  return (
    <section className="register | container">
      <header className="register__header">
        <div>
          <a className="register__header-link" href="/">
            <p className="register__header-title">HASH</p>
          </a>
        </div>
        <div>
          <button className="register__header-btn" onClick={handleToggleHam}>
            {toggleHam ? (
              <img
                className="register__header-img"
                src="/hamClose.svg"
                alt="Close Menu"
              />
            ) : (
              <img
                className="register__header-img"
                src="/hamOpen.svg"
                alt="Open Menu"
              />
            )}
          </button>
        </div>
      </header>
      {toggleHam && (
        <div className="register__ham-menu-wrapper">
          <div className="register__ham-menu">
            <button className="register__ham-btn" onClick={handleToggleHam}>
              <img
                className="register__ham-img"
                src="/hamClose.svg"
                alt="Close Menu"
              />
            </button>
            <a className="register__mobile-nav-btn | btn" href="/">
              Home
            </a>
            <a className="register__mobile-nav-btn | btn" href="/about">
              About
            </a>
          </div>
        </div>
      )}
      <form className="regsiter__form" onSubmit={handleFormSubmit}>
        <div className="register__form-conatiner">
          <h2 className="register__title">Create An Account</h2>
          <div className="register__input-wrapper">
            <label className="register__label" htmlFor="username">
              Username
            </label>
            <input
              className="register__input"
              type="name"
              name="username"
              id="username"
              onChange={handleFormData}
              value={formData.username}
            />
          </div>
          <div className="register__input-wrapper">
            <label className="register__label" htmlFor="email">
              Email
            </label>
            <input
              className="register__input"
              type="email"
              name="email"
              id="email"
              onChange={handleFormData}
              value={formData.email}
            />
          </div>
          <div className="register__input-wrapper">
            <label className="register__label" htmlFor="password">
              Password
            </label>
            <div className="register__password-input-wrapper">
              <input
                className="register__input register__input--width-padding"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleFormData}
                value={formData.password}
              />
              <div className="register__input-icon-wrapper">
                <button
                  type="button"
                  className="register__input-icon-btn"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <img
                      className="register__input-icon"
                      src="/eyeOpen.svg"
                      alt="Password"
                    />
                  ) : (
                    <img
                      className="register__input-icon"
                      src="/eyeClose.svg"
                      alt="Password"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          {errorMsg && (
            <div className="register__error-msg-wrapper">
              <p className="register__error-msg">{errorMsg}</p>
            </div>
          )}
          <div className="register__bottom-wrapper">
            <div className="register__loader-wrapper">
              {!loader ? (
                <button
                  className="register__btn | btn btn--clr-bg"
                  type="sumbit"
                  disabled={isDisable}
                >
                  Create Account
                </button>
              ) : (
                <div className="register__btn-loader-wrapper">
                  <Loader />
                </div>
              )}
            </div>
            <div className="register__para-link-wrapper">
              <p className="register__para-link">Already Have An Account? </p>
              <a className="register__link" href="/login">
                Log In
              </a>
            </div>
          </div>
          {toggleHam && <div className="register__form-disable"></div>}
        </div>
      </form>
    </section>
  );
};

export default Register;
