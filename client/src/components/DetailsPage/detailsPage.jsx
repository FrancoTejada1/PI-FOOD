import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../redux/actions/index.js";

export default function DetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const allDetails = useSelector((state) => state.details);

  console.log(allDetails);

  return (
    <div>
      <Link to="/recipes">
        <button>Back</button>
      </Link>
      <div>
        <img src={allDetails.img} alt={allDetails.name} />
        <h1>{allDetails.name}</h1>
        <ul>
          <li>
            {allDetails.diets
              ? typeof allDetails.diets[0] !== "object"
                ? allDetails.diets.join(", ")
                : allDetails.diets?.map((d) => d.name).join(", ")
              : null}
          </li>
        </ul>
        <p>{allDetails.description}</p>
        <p>Score: {allDetails.score}</p>
        <p>Healthy Level: {allDetails.healthyLevel}</p>
        <p>Instructions: {allDetails.instructions}</p>
      </div>
    </div>
  );
}
