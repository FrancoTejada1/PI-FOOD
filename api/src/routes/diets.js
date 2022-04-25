const { Router } = require('express');
const { Diets } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
    const dietTypes = [
        "Gluten Free",
        "Dairy Free",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Paleo",
        "Prima",
        "Whole30",
        "Ketogenic",
        "Vegetarian",
        "Pescetarian",
        "Low FODMAP",
      ];
      
      dietTypes.forEach(async (d) => {
        await Diets.findOrCreate({
          where: {
            name: d,
          },
        });
      });
    
      try {
        const alldiets = await Diets.findAll();
        
        res.status(200).send(alldiets);
      } catch (error) {
        console.log(error);
      }
    
      res.status(200).send();
});

module.exports = router;