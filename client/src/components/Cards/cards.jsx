import React from "react";
import { Link } from "react-router-dom";
import style from "./cards.module.css";

export default function Cards({ img, name, diets, id }) {
  var key = 1;

  console.log(diets);
  return (
    <div className={style.conteiner_card}>
      <div className={style.card}>
        <Link to={`/recipes/${id}`}>
          <img className={style.img_holder} src={img} alt={name} />
          <h1 className={style.title}>{name}</h1>
          <div className={style.diets}>
            <p key={key++}>
              {typeof diets[0] !== "string"
                ? diets?.map((d) => d.name).join(" ")
                : diets.join(", ")}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
