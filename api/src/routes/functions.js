const axios = require('axios');
const {Recipe, TypeDiet} = require('../db');
const {API_KEY} = process.env;


const getRecipeApi = async() => {
    const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const recetas = info.data.results
    const retorno = recetas.map(e => {
            // const instrucciones = e.analyzedInstructions.map(e => e.steps);
            return{
                id: e.id,
                name: e.title,
                summary: e.summary.replace(/<[^>]*>?/g, ""),
                punctuation: e.weightWatcherSmartPoints,
                healthScore: e.healthScore,
                instructions: e.analyzedInstructions[0]?.steps.map(s=>s.step),
                image: e.image,
                diets: e.diets
            }
       });
    return retorno;
}

const getRecipeDB = async () => {
   const db = await Recipe.findAll({
       include:{
           model: TypeDiet,
           attributes: ['name'],
           through:{
            attributes: []
        }
       }
   })
    
   const dbRecipes = db.map(e => {
       return{
        id: e.id,
        name: e.name,
        summary: e.summary,
        punctuation: e.punctuation,
        healthScore: e.healthScore,
        instructions: e.instructions,
        image: e.image,
        diets: e.TypeDiets.map(e => e.name)
       }
   })
   return  dbRecipes;
}

const getAllRecipes = async () => {
    const api = await getRecipeApi();
    const db = await getRecipeDB();
    const todo = api.concat(db)
    return todo;
}

const getDetail = async(id) => {
    const recetas = await getAllRecipes();
    const detalle = recetas.find(e => e.id==id)
    console.log(detalle)
    if(detalle) return detalle;
    else{
        return 'id not existing'
    }
}


const getType = async() => {
    const receta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const dieta = receta.data.results
    const tipos = dieta.map(e => e.diets)
    let arr1 = tipos.flat();
    let arr2 = new Set(arr1);
    let arr3 = [...arr2]
    let arr4 = arr3.map(e => { return {name:e}})
    console.log(arr4)
    await TypeDiet.bulkCreate(arr4)
}

const postRecipe = async( name, summary, punctuation, healthScore, instructions, image, diets) => {
    const newRecipe = await Recipe.create({
        name,
        summary,
        punctuation: punctuation?punctuation:0,
        healthScore: healthScore?healthScore:0,
        instructions: instructions?instructions:'',
        image: image?image:'https://comodibujar.club/wp-content/uploads/2020/09/kawaii-Aguacate-300x300.jpg',
    });
    for(let i=0 ; i<diets.length ; i++){
       const tipoDeDieta = await TypeDiet.findOne({where: {name: diets[i]}}); 
       newRecipe.addTypeDiet(tipoDeDieta);
       console.log(tipoDeDieta)
    }
    // console.log(newRecipe)

    return newRecipe;
}

module.exports = {
    getAllRecipes,
    getDetail,
    getType,
    postRecipe
}