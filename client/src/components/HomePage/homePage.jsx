import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions/index.js";
import Pagination from "../Pagination/pagination.jsx";
import { Link } from "react-router-dom";
import Cards from "../Cards/cards.jsx";

export default function HomePage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1); // seteamos la pagina a la primera
  const [recipe] = useState(9); // seteamos 9 recetas por pagina

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  const allRecipes = useSelector((state) => state.recipes);

  const indexOfLastRecipe = page * recipe;
  const indexOfFirstRecipe = indexOfLastRecipe - recipe;

  const recipesByPages = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const pagination = (numberPage) => {
    setPage(numberPage);
  };

  return (
    <div>
      <button>CREATE RECIPE</button>

      <select>
        <option value="All">All</option>
      </select>
      <select>
        <option value="All">All</option>
        <option value="Asc">A-Z</option>
        <option value="Desc">Z-A</option>
      </select>
      <select>
        <option value="All">All</option>
        <option value="Higher Score">Higher Score</option>
        <option value="Lower Score">Lower Score</option>
      </select>
      {recipesByPages?.map((r) => {
        return (
          <Cards
            id={r.id}
            key={r.id}
            img={r.img}
            name={r.name}
            diets={r.diets}
          />
        );
      })}
      <Pagination
        recipe={recipe}
        allRecipes={allRecipes.length}
        pagination={pagination}
      />
    </div>
  );
}
