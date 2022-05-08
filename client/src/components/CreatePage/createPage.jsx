import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postRecipes, getDiets } from "../../redux/actions/index.js";
import style from "./createPage.module.css";

export default function NewRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const diets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    name: "",
    img: "",
    description: "",
    score: "",
    healthyLevel: "",
    instructions: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSelect = (e) => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  };

  function handlerSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postRecipes(input));
    setInput({
      name: "",
      img: "",
      description: "",
      core: "",
      healthyLevel: "",
      instructions: "",
      diets: [],
      id: "",
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
              value={input.name}
              placeholder="Name of Recipe"
              name="name"
              onChange={(e) => handlerChange(e)}
              required
            ></input>
          </div>
          <div>
            <label className={style.label}>Image</label>
            <input
              className={style.input}
              type="text"
              value={input.img}
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
              value={input.description}
              placeholder="Description"
              name="description"
              onChange={(e) => handlerChange(e)}
              required
            ></input>
          </div>
          <div>
            <label className={style.label}>Score</label>
            <input
              className={style.input}
              type="number"
              value={input.score}
              placeholder="Score"
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
              value={input.healthyLevel}
              placeholder="Healthy Level"
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
              value={input.instructions}
              placeholder="Instructions"
              name="instructions"
              onChange={(e) => handlerChange(e)}
            ></input>
          </div>
          <div>
            <label className={style.label}>Diets</label>
            <select
              className={style.select}
              placeholder="Diets"
              onChange={(e) => handlerSelect(e)}
            >
              {diets?.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <p className={style.diets_concats}>
            {input.diets?.map((d) => `${d}, `)}
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
