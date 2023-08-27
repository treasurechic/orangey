import React from "react";
import logo from "assets/img/logo.png";

export const Logo = () => {
  return (
    <div className="logo-wrapper">
      <div>
        <img src={logo} alt="orangey logo" />
      </div>
      <span>Orangey</span>
    </div>
  );
};
