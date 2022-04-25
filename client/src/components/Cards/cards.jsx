import React from "react";
import { Link } from "react-router-dom";

export default function Cards({ img, name, diets, id }) {
  var key = 1;

  return (
    <div>
      <Link to={`/recipes/${id}`}>
        <img src={img} alt={name} />
        <h1>{name}</h1>
        <div>
            <h2 key={key++}>
              {typeof diets[0] !== "string"
                ? diets?.map((d) => d.name).join(" ")
                : diets.join(", ")}
            </h2>
        </div>
      </Link>
    </div>
  );
}
