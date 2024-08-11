import React from "react";
import "./password.css";

const Password = (props) => {
  return (
    <div className="password">
      <img className="password__img" src="/website.svg" alt="" />
      <p className="password__description">{props.site}</p>
    </div>
  );
};

export default Password;
