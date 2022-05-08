import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../redux/actions/index.js";
import style from "./detailsPage.module.css";

export default function DetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const allDetails = useSelector((state) => state.details);

  console.log(allDetails);

  return (
    <div className={style.bg_details}>
      <div className={style.details}>
        <Link className={style.a_back_details} to="/recipes">
          <button className={style.boton}>{"<<"}</button>
        </Link>
        <div >
          <img className={style.img_holder} src={allDetails.img} alt={allDetails.name}/>
          <div className={style.title}>
            <h1>{allDetails.name}</h1>
          </div>
          <div className={style.diets}>
          <ul className={style.ul_details_diet}>
            <li>
            {allDetails.diets
                ? typeof allDetails.diets[0] !== "object"
                  ? allDetails.diets.join(", ")
                  : allDetails.diets?.map((d) => d.name).join(", ")
                : null
            }
            </li> 
          </ul>
          </div>
          <p className={style.score}>Score: {allDetails.score}</p>
          <p className={style.healthyLevel}>Healthy Level: {allDetails.healthyLevel}</p>
          <p className={style.description}>{allDetails.description}</p>
          <p className={style.instructions}>Instructions: {allDetails.instructions}</p>
        </div>
      </div>
    </div>
  );
}
