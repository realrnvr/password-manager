import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderTwo from "../../components/headerTwo/HeaderTwo";
import axios from "axios";
import "./site.css";

const Site = () => {
  const { id: passwordId } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [passData, setPassData] = useState({
    site: "",
    username: "",
    password: "",
    note: "",
  });
  const [dummyPassData, setDummyPassData] = useState({});
  const [genPass, setGenPass] = useState("");
  const [isGenPass, setIsGenPass] = useState(false);
  const [isload, setIsLoad] = useState(false);

  const handleIsGenPass = () => {
    setIsGenPass((prevIsGenPass) => {
      return !prevIsGenPass;
    });
  };

  const handleIsEdit = () => {
    return JSON.stringify(dummyPassData) !== JSON.stringify(passData);
  };
  console.log(handleIsEdit());

  const handleCopy = async (toCopy) => {
    try {
      await navigator.clipboard.writeText(toCopy);
      setMsg("Copied.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (error) {
      setMsg("Can't be Copied.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  const handleClose = () => {
    navigate("/manager");
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => {
      return !prevShowPassword;
    });
  };

  const handlePassData = (e) => {
    const { name, value } = e.target;
    setPassData((prevPassData) => {
      return {
        ...prevPassData,
        [name]: value,
      };
    });
  };

  const fetchRandomPassword = async () => {
    try {
      setIsLoad(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/password`
      );
      setIsLoad(false);
      const { random_password: newPassword } = response.data;
      setGenPass(newPassword);
    } catch (error) {
      setMsg("Something went wrong.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  const fetchPassData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/manager/${passwordId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const {
        data: {
          manager: { site, username, password, note },
        },
      } = response;
      setPassData((prevPassData) => {
        return {
          ...prevPassData,
          site,
          username,
          password,
          note,
        };
      });
      setDummyPassData(() => {
        return {
          site,
          username,
          password,
          note,
        };
      });
    } catch (error) {
      setMsg("Something went wrong.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  const updatePassData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.patch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/manager/${passwordId}`,
        passData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPassData();
      setMsg("Edited.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (error) {
      setMsg("Something went wrong.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updatePassData();
  };

  const handlePasswordGenerator = () => {
    fetchRandomPassword();
  };

  const deletePassData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/manager/${passwordId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/manager");
    } catch (error) {
      setMsg("Something went wrong.");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  const handleUseGenPass = () => {
    if (!isGenPass) {
      setPassData((prevPassData) => {
        return {
          ...prevPassData,
          password: genPass,
        };
      });
    } else {
      fetchPassData();
    }
  };

  useEffect(() => {
    fetchPassData();
  }, []);

  return (
    <section className="site | container">
      <header>
        <HeaderTwo />
      </header>
      <form onSubmit={handleFormSubmit}>
        <div className="site__content">
          <div className="site__img-wrapper">
            <button
              className="site__arrow-btn"
              onClick={handleClose}
              type="button"
            >
              <img className="site__arrow-icon" src="/leftArrow.svg" alt="" />
            </button>
          </div>
          <div className="site__title">
            <img className="site__website-icon" src="/website.svg" alt="" />
            <h4 className="site__name">{passData.site}</h4>
          </div>
          <div className="site__input-container">
            <div className="site__input-wrapper">
              <input
                className="site__input site__input--pd-r-4rem"
                type="text"
                placeholder="username"
                name="username"
                value={passData.username}
                onChange={handlePassData}
              />
              <button
                className="site__icon-btn site__icon-btn--disable"
                type="button"
                onClick={() => handleCopy(passData.username)}
                disabled={!passData.username}
              >
                <img className="site__copy-icon" src="/copy.svg" alt="" />
              </button>
            </div>
            <div className="site__input-wrapper">
              <input
                className="site__input site__input--pd-r-9rem"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                value={passData.password}
                onChange={handlePassData}
              />
              <button
                className="site__icon-btn site__icon-btn--right-15"
                type="button"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <img className="site__eye-icon" src="/eyeOpen.svg" alt="" />
                ) : (
                  <img className="site__eye-icon" src="/eyeClose.svg" alt="" />
                )}
              </button>
              <button
                className="site__icon-btn site__icon-btn--disable"
                type="button"
                onClick={() => handleCopy(passData.password)}
                disabled={!passData.password}
              >
                <img className="site__copy-icon" src="/copy.svg" alt="" />
              </button>
            </div>
            <div className="site__input-wrapper">
              <textarea
                className="site__text-area"
                placeholder="Add note"
                name="note"
                value={passData.note}
                onChange={handlePassData}
              />
            </div>
            <div className="site__input-wrapper">
              <input
                className="site__input site__input--border-radius"
                type="text"
                defaultValue={genPass}
                placeholder="Generate Password"
                readOnly
              />
              <button
                className="site__icon-btn site__icon-btn--right-15"
                type="button"
                onClick={handlePasswordGenerator}
              >
                <img className="site__key-icon" src="/key.svg" alt="" />
              </button>
              <button
                className="site__icon-btn site__icon-btn--disable"
                type="button"
                onClick={() => {
                  setShowPassword(true);
                  handleIsGenPass();
                  handleUseGenPass();
                }}
                disabled={!genPass}
              >
                {isGenPass ? (
                  <img className="site__use-icon" src="/not.svg" alt="" />
                ) : (
                  <img className="site__use-icon" src="/use.svg" alt="" />
                )}
              </button>
              {isload && <div className="input-loader"></div>}
            </div>
          </div>
          {msg && (
            <div className="site__msg-container">
              <p className="site__msg">{msg}</p>
            </div>
          )}
          <div className="site__btn-wrapper">
            <button
              className="site__btn site__btn--disable | btn btn--clr-bg"
              type="submit"
              disabled={!handleIsEdit()}
            >
              Edit
            </button>
            <button
              className="site__btn | btn btn--clr-bg"
              type="button"
              onClick={deletePassData}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Site;
