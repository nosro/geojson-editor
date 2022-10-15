import React from "react";
import "./topbar.css";
import logo from '../../assets/logo_inverse.png';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={logo} className="appLogo" alt="logo" />
        </div>
      </div>
    </header>
  );
}
