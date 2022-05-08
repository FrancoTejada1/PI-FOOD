import React from "react";
import style from "./pagination.module.css";

export default function Pagination({ allRecipes, recipe, pagination }) {
  const maximoPage = Math.ceil(allRecipes / recipe);

  const numberPages = [];

  for (let i = 1; i <= maximoPage; i++) {
    numberPages.push(i);
  }

  var key = 1;

  return (
    <div className={style.pagination}>
      <ul className={style.ul_pagination}>
        {numberPages?.map((n) => {
          return (
            <li key={key++}>
              <div className={style.listas}>
                <button onClick={() => pagination(n)}>{n}</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
