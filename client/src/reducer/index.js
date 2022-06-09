import { GET_FOOD, GET_FOOD_BY_NAME, DETAIL, FILTER_BY_DIETS, ORDER_BY_NAME, POST_RECIPE, GET_DIETS , SET_LOADING, FILTER_PUNCTUATION} from "../actions";


const initialState = {
    food:[],
    food2:[],
    detalle:{},
    types:[],
    loading: false
}

function rootReducer (state=initialState, action){
    switch(action.type){
        case GET_FOOD:
            return{
                ...state,
                food: [...action.payload],
                food2: [...action.payload]
            }
        case GET_FOOD_BY_NAME:  
            return{
                ...state,
                food: [...action.payload]
            }  
        case DETAIL: 
            return{
                ...state,
                detalle: action.payload,
                loading: false
            }  
        case FILTER_BY_DIETS:
            const allFood = state.food2;
            const foodFiltrada = action.payload === 'Diets'? allFood : allFood.filter(e => e.diets.includes(action.payload))
            return{
                ...state,
                food: [...foodFiltrada]
            }
        case ORDER_BY_NAME:
            let azar = state.food;
            const orderFood = action.payload === 'asc'? azar.sort((a,b) => {
                if(a.name < b.name){
                    return -1;
                }
                if(a.name > b.name){
                    return 1;
                }
                return 0;
            }) : azar.sort((a,b) => {
                 if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0;
            }) 
            return{
                ...state,
                food: [...orderFood]
            }
        case GET_DIETS:
            return{
                ...state,
                types: [...action.payload]
            }  
        case POST_RECIPE:
            return{
                ...state
            }
        case SET_LOADING:
            return{
                ...state,
                loading: action.payload
            } 
        case FILTER_PUNCTUATION:
            const todo = state.food2;
            const orderFoodByPun = action.payload === 'men'? todo.sort((a,b) => {
                if(a. healthScore < b. healthScore){
                    return -1;
                }
                if(a. healthScore > b. healthScore){
                    return 1;
                }
                return 0;
            }) : todo.sort((a,b) => {
                 if(a.healthScore > b.healthScore){
                    return -1;
                }
                if(a.healthScore < b.healthScore){
                    return 1;
                }
                return 0;
            }) 
            return{
                ...state,
                food: [...orderFoodByPun]
            }

        default : return state    
    }
}

export default rootReducer;
