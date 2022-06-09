const { Router } = require('express');
const {getDetail, getAllRecipes, getType, postRecipe} = require('./functions');
const {Recipe, TypeDiet} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res, next) => {
    const {name} = req.query;
    try{
        const recipe = await getAllRecipes();
        if(name){
            const byName = recipe.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            byName?
            res.send(byName)
            : res.status(404).send('recipe not existing')
        }
        else{
            res.send(recipe)
        }
    }
   catch(error){
       next(error)
   }
   
})

router.get('/recipes/:id', async(req, res, next) => {
    const {id} = req.params;
    try{
        const detalle =  await getDetail(id)
        res.send(detalle)
    }
    catch(error){
        next(error)
    }
})

router.get('/types', async(req, res, next) => {
    try{
        const check = await TypeDiet.count();
        if(check===0){
            await getType();
        }
        const tipos = await TypeDiet.findAll();
        res.send(tipos);        
    }
    catch(error){
        next(error)
    }
})

router.post('/recipes', async(req, res, next) => {
    const { name, summary, punctuation, healthScore, instructions, image, diets} = req.body;
    try{
        if(!name || !summary || !diets){
            res.status(404).send('complete the necessary fields')
        }else{
            const nuevaReceta = await postRecipe( name, summary, punctuation, healthScore, instructions, image, diets);
            res.send(nuevaReceta)
        }
    }
    catch(error){
        next(error)
    }
})

module.exports = router;
