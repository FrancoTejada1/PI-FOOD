import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postRecipes, getDiets } from "../../redux/actions/index.js";
import style from "./createPage.module.css";

const validation = (recipe) => {
  let errors = {};

  if(!recipe.name){
    errors.name = "name required"
  }
  else if(!recipe.description){
    errors.description = "description required"
  }

  return errors;
}

export default function NewRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const diets = useSelector((state) => state.diets);

  const [recipes, setRecipes] = useState({
    name: "",
    img: "",
    description: "",
    score: "",
    healthyLevel: "",
    instructions: "",
    diets: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handlerChange = (e) => {
    setRecipes({
      ...recipes,
      [e.target.name]: e.target.value
    });
    setErrors(validation({
      ...recipes,
      [e.target.name]: e.target.value
    }))
  };

  const handlerSelect = (e) => {
    setRecipes({
      ...recipes,
      diets: [...recipes.diets, e.target.value],
    });
  };
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(recipes);
    dispatch(postRecipes(recipes));
    alert("se creo con exito")
    setRecipes({
      name: "",
      img: "",
      description: "",
      core: "",
      healthyLevel: "",
      instructions: "",
      diets: [],
    });
    navigate("/recipes");
  }

  return (
    <div className={style.bg_create}>
      <Link to="/recipes">
        <button className={style.bt_back_create}>{"<<"}</button>
      </Link>
      <div>
        <h1 className={style.title_create}>Create your own Recipe</h1>
      </div>
      <div className={style.inputs}>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div>
            <label className={style.label}>Name of Recipe</label>
            <input
              className={style.input}
              type="text"
              value={recipes.name}
              placeholder="Name of Recipe"
              name="name"
              onChange={(e) => handlerChange(e)}
            ></input>
            {errors.name ? (<p className={style.validation}>{errors.name}</p>) : null}
          </div>
          <div>
            <label className={style.label}>Image</label>
            <input
              className={style.input}
              type="text"
              value={recipes.img}
              placeholder="Image(URL)"
              name="img"
              onChange={(e) => handlerChange(e)}
            ></input>
          </div>
          <div>
            <label className={style.label}>Description</label>
            <input
              className={style.input}
              type="text"
              value={recipes.description}
              placeholder="Description"
              name="description"
              onChange={(e) => handlerChange(e)}
              required
            ></input>
            {errors.description ? <p className={style.validation}>{errors.description}</p> : null}
          </div>
          <div>
            <label className={style.label}>Score</label>
            <input
              className={style.input}
              type="number"
              value={recipes.score}
              placeholder="(0 - 100)"
              name="score"
              onChange={(e) => handlerChange(e)}
              min="0"
              max="100"
            ></input>
          </div>
          <div>
            <label className={style.label}>Healthy Level</label>
            <input
              className={style.input}
              type="number"
              value={recipes.healthyLevel}
              placeholder="(0-100)"
              name="healthyLevel"
              onChange={(e) => handlerChange(e)}
              min="0"
              max="100"
            ></input>
          </div>
          <div>
            <label className={style.label}>Instructions</label>
            <input
              className={style.input}
              type="text"
              value={recipes.instructions}
              placeholder="Instructions"
              name="instructions"
              onChange={(e) => handlerChange(e)}
            ></input>
          </div>
          <div>
            <label className={style.label}>Diets</label>
            <select className={style.select} onChange={(e) => handlerSelect(e)}>
              {diets?.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <p className={style.diets_concats}>
            {recipes.diets?.map((d) => `${d}, `)}
          </p>
          <div>
            <button className={style.bt_create} type="submit">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
