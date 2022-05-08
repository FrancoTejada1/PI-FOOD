import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.bg_landing}>
      <div className={style.bg_text}>
        <h1>Welcome to our Cookbook</h1>
        <div>
          <Link to="/recipes">
            <button className={style.boton}>Enter</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
