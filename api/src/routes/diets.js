const { Router } = require('express');
const { Diets } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
    const dietTypes = [
        "gluten free",
        "dairy free",
        "lacto ovo vegetarian",
        "vegan",
        "paleolithic",
        "primal",
        "whole 30",
        "pescatarian",
        "fodmap friendly",
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
});

module.exports = router;