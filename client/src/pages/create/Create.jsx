import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTwo from "../../components/headerTwo/HeaderTwo";
import axios from "axios";
import "./create.css";

const Create = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [passwordData, setPasswordData] = useState({
    site: "",
    username: "",
    password: "",
    note: "",
  });

  const [isDisable, setIsDisable] = useState(true);

  const checkSite = (site) => {
    const regex = /\.[a-zA-Z0-9]/;
    if (!site) {
      return true;
    }
    return regex.test(site);
  };

  const checkURL = (site) => {
    const occurrences = (site.match(/https:\/\//g) || []).length;
    return occurrences === 1;
  };

  const createURL = (site) => {
    if (!site) {
      return;
    }
    const url = checkSite(site) ? `https://${site}` : site;
    if (checkURL(url)) {
      setPasswordData((prevPasswordData) => {
        return {
          ...prevPasswordData,
          site: url,
        };
      });
    }
  };

  const validateFormFill = (obj) => {
    const objArray = Object.values(obj);
    let isTrue = false;
    for (let i = 0; i < objArray.length - 1; i++) {
      if (!objArray[i]) {
        isTrue = true;
      }
    }
    return isTrue;
  };

  useEffect(() => {
    setIsDisable(validateFormFill(passwordData));
  }, [passwordData]);

  const handleClose = () => {
    navigate("/manager");
  };

  const handlePasswordData = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevPasswordData) => {
      return {
        ...prevPasswordData,
        [name]: value,
      };
    });
  };

  const createPassword = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/manager`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/manager");
    } catch (error) {
      setErrorMsg(error.response.data.msg);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  const fetchRandomPassword = async () => {
    try {
      setIsLoad(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/password`
      );
      setIsLoad(false);
      const { random_password: newPassword } = response.data;
      setPasswordData((prevPasswordData) => {
        return {
          ...prevPasswordData,
          password: newPassword,
        };
      });
    } catch (error) {
      setErrorMsg("Something went wrong.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  const handlePasswordGenerator = () => {
    fetchRandomPassword();
  };

  const submitPasswordData = (e) => {
    e.preventDefault();
    createPassword();
  };

  return (
    <section className="create | container">
      <header>
        <HeaderTwo />
      </header>
      <form onSubmit={submitPasswordData}>
        <div className="create__form">
          <div className="create__header-container">
            <div className="create__left-wrapper">
              <button className="create__close-btn" onClick={handleClose}>
                <img className="create__close-icon" src="close.svg" alt="" />
              </button>
              <h3 className="create__title">Add password</h3>
            </div>
            <div>
              <button
                type="submit"
                className="create__btn | btn--clr-bg"
                disabled={isDisable}
              >
                save
              </button>
            </div>
          </div>
          <div className="create__input-container">
            <div className="create__input-wrapper">
              <label htmlFor="site">Site</label>
              <input
                className="create__input"
                type="text"
                name="site"
                id="site"
                onChange={handlePasswordData}
                value={passwordData.site}
                style={
                  checkSite(passwordData.site)
                    ? {}
                    : { border: "1px solid red" }
                }
                onBlur={() => {
                  createURL(passwordData.site);
                }}
              />
            </div>
            <div className="create__input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                className="create__input"
                type="text"
                name="username"
                id="username"
                onChange={handlePasswordData}
                value={passwordData.username}
              />
            </div>
            <div className="create__input-wrapper">
              <label htmlFor="password">Password</label>
              <div className="create__input-btn-wrapper">
                <input
                  className="create__input create__input--pd-r"
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Generate Password"
                  onChange={handlePasswordData}
                  value={passwordData.password}
                />
                <button
                  className="create__key-btn"
                  onClick={handlePasswordGenerator}
                  type="button"
                >
                  <img className="create__key-icon" src="/key.svg" alt="" />
                </button>
                {isLoad && <div className="input-loader"></div>}
              </div>
            </div>
            <div className="create__input-wrapper">
              <label htmlFor="note">Note</label>
              <textarea
                className="create__text-area"
                name="note"
                id="note"
                onChange={handlePasswordData}
                value={passwordData.note}
              />
            </div>
          </div>
        </div>
      </form>
      {errorMsg && (
        <div className="create__error-msg-container">
          <p className="create__error-msg">{errorMsg}</p>
        </div>
      )}
    </section>
  );
};

export default Create;
