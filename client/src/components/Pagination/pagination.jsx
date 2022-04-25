import React from "react";

export default function Pagination({ allRecipes, recipe, pagination }) {
  
    const maximoPage = Math.ceil(allRecipes / recipe);

    const numberPages = [];

    for(let i = 1; i <= maximoPage; i++){
        numberPages.push(i)
    };

    var key = 1;

    return (
        <div>
            <ul>
                {
                    numberPages?.map((n) => {
                        return (
                        <li key={key++}>
                            <button onClick={() => pagination(n)}>{n}</button>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
