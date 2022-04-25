const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diets } = require('../db.js');
const { YOUR_API_KEY } = process.env;

const router = Router();

var urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`;

const getApi = async () => {
  const info = await axios.get(urlApi);

  const recipes = info.data.results.map((r) => {
    return {
      id: r.id,
      name: r.title,
      img: r.image,
      description: r.summary,
      score: r.spoonacularScore,
      healthyLevel: r.healthScore,
      instructions: r.analyzedInstructions[0]
        ? r.analyzedInstructions[0].steps.map((i) => i.step)
        : "not instructions",
      diets: r.diets.map((d) => d),
    };
  });
  return recipes;
};

const getDB = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const api = await getApi();
  const dB = await getDB();
  const totalInfo = api.concat(dB);
  return totalInfo;
};

router.get('/', async (req, res) => {
    const recipe = await getAllInfo();
  const { name } = req.query;

  try {
    if (name) {
      const findByName = recipe.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()));

      findByName.length
        ? res.status(200).send(findByName)
        : res.status(400).send("recipes not found");
    } else {
      res.status(200).send(recipe);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
    const recipeId = await getAllInfo();
  const { id } = req.params;

  try {
    const findById = recipeId.find((r) => r.id == id);

    if (findById) {
       res.status(200).send(findById);
    } else {
      res.status(400).send("id is not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
    const {id, name, img, description, score, healthyLevel, instructions, createdInDB, diets } = req.body;

    const newFood = await Recipe.create({
        id,
        name,
        img,
        description,
        score,
        healthyLevel,
        instructions,
        createdInDB
    })

    const diet = await Diets.findAll({
        where: {
            name: diets
        }
    });

    newFood.addDiet(diet);

    res.status(200).send("se creo la comida");
});

module.exports = router;