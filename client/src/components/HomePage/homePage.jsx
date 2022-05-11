import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions/index.js";
import Pagination from "../Pagination/pagination.jsx";
import { Link } from "react-router-dom";
import Cards from "../Cards/cards.jsx";
import { filterByDiets } from "../../redux/actions/index.js";
import { filterByUploaded } from "../../redux/actions/index.js";
import { sortByName } from "../../redux/actions/index.js";
import { sortByScore } from "../../redux/actions/index.js";
import SearchBar from "../SearchBar/searchBar.jsx";
import style from "./homePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1); // seteamos la pagina a la primera
  const [recipe] = useState(9); // seteamos 9 recetas por pagina
  const [order, setOrder] = useState("");

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

  const handlerFilterByDiets = (e) => {
    dispatch(filterByDiets(e.target.value));
  }

  const handlerSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  const handlerSortByScore = (e) => {
    e.preventDefault();
    dispatch(sortByScore(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  console.log(allRecipes);

  return (
    <div className={style.bg_home}>
      
      <SearchBar />
      <div className={style.container_boton}>
        <Link className={style.a_create} to="/create">
          <button className={style.button_go_create}>Create Recipe</button>
        </Link>
      </div>
      <div className={style.header}>
        <select className={style.select} onChange={(e) => handlerFilterByDiets(e)}>
          <option value="All">All</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="fodmap friendly">Fodmap Friendly</option>
        </select>
        <select className={style.select} onChange={(e) => handlerSortByName(e)}>
          <option value="Ascendent">Ascendent</option>
          <option value="Descendent">Descendent</option>
        </select>
        <select className={style.select} onChange={(e) => handlerSortByScore(e)}>
          <option value="Higher Score">Higher Score</option>
          <option value="Lower Score">Lower Score</option>
        </select>
      </div>
      
      <div>
        <Pagination
          recipe={recipe}
          allRecipes={allRecipes.length}
          pagination={pagination}
        />
      </div>
      <div>
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
      </div>
    </div>
    
  );
}
