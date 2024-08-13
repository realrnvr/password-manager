import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Password from "../../components/password/Password";
import HeaderTwo from "../../components/headerTwo/HeaderTwo";
import axios from "axios";
import "./manager.css";
import Loader from "../../components/loader/Loader";

const Manager = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const filteredItems = allPasswords.filter((item) =>
    item.site.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleSite = (passwordId) => {
    navigate(`/site/${passwordId}`);
  };

  const fetchPasswordData = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const {
        data: { manager },
      } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/manager`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setAllPasswords(manager);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPasswordData();
  }, []);

  return (
    <section className="manager | container">
      <header>
        <HeaderTwo />
      </header>
      <div className="manager__content">
        <div className="manager__search">
          <img className="manager__search-icon" src="/search.svg" alt="" />
          <input
            className="manager__search-input"
            type="text"
            placeholder="Search passwords"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="manager__add-wrapper">
          <button className="manager__add-btn" onClick={handleCreate}>
            <img className="manager__add-icon" src="/add.svg" alt="" />
          </button>
          <p className="manager__add-description">Add password</p>
        </div>
        {!loading ? (
          <>
            <div className="manager__password-container">
              {filteredItems.length > 0 ? (
                filteredItems.map((val, index) => {
                  const { _id: passwordId, site } = val;
                  return (
                    <button
                      key={index}
                      className="manager__password-btn"
                      onClick={() => handleSite(passwordId)}
                    >
                      <Password site={site} />
                    </button>
                  );
                })
              ) : (
                <p className="manager__empty">Create one!</p>
              )}
            </div>
          </>
        ) : (
          <div className="manager__loader-wrapper">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default Manager;
