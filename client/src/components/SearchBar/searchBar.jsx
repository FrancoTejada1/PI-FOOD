import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions/index.js";
import style from './searchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handlerInputChange = (e) => {
      e.preventDefault();
      setName(e.target.value);
      console.log(name)
  };

  const handlerButton = (e) => {
      e.preventDefault();
      dispatch(getRecipesByName(name));
  };

  return (
      <div className={style.searchBar}>
          <input className={style.search} type="text" placeholder="Search names..." onChange={(e) => handlerInputChange(e)} value={name}/>
          <button className={style.submit} type="submit" onClick={(e) => handlerButton(e)}>{'>'}</button>
      </div>
  )
};
