import { v4 as uuidv4 } from 'uuid';
import {
  GENERAL_ERROR,
  CLEAR_GENERAL_MESSAGES
  // CREATE_INGREDIENT,
  // EDIT_INGREDIENT,
  // UPDATE_INGREDIENT,
  // DELETE_INGREDIENT,

  // CREATE_DIRECTION,
  // EDIT_DIRECTION,
  // UPDATE_DIRECTION,
  // DELETE_DIRECTION,

  // UPDATE_DISHTYPE,
  // UPDATE_DESCR,
  // UPDATE_FILES
} from '../reduces/types';


// const handleError = (errMsg) => (dispatch) => {
//   dispatch({ type: GENERAL_ERROR, payload: { msg: errMsg, name: 'GeneralError' } });
//   dispatch({ type: CLEAR_GENERAL_MESSAGES });
// };

const handleError = (errMsg) => {
  return {
    type: GENERAL_ERROR,
    payload: { msg: errMsg }
  }
}

// // INGREDIENTS

// // creating new ingredient
// const createIngredient = () => {
//   const ingredient = {
//     id: uuidv4(),
//     text: '',
//     isEditing: true
//   };

//   return {
//     type: CREATE_INGREDIENT,
//     payload: { ingredient }
//   }
// };


// // switching ingredient state to editing mode
// const editIngredient = (id) => {
//   return {
//     type: EDIT_INGREDIENT,
//     payload: { id }
//   };
// };


// // updating text content of ingredient and switch off editing mode
// const updateIngredient = (id, value) => {
//   return {
//     type: UPDATE_INGREDIENT,
//     payload: { id, value }
//   };
// };


// // deleting ingredient from the state
// const deleteIngredient = (id) => {
//   return {
//     type: DELETE_INGREDIENT,
//     payload: { id }
//   };
// };




// // DIRECTIONS

// // creating new direction
// const createDirection = () => {
//   const direction = {
//     id: uuidv4(),
//     text: '',
//     isEditing: true
//   };

//   return {
//     type: CREATE_DIRECTION,
//     payload: { direction }
//   }
// };


// // switching direction state to editing mode
// const editDirection = (id) => {
//   return {
//     type: EDIT_DIRECTION,
//     payload: { id }
//   };
// };


// // updating text content of direction and switch off editing mode
// const updateDirection = (id, value) => {
//   return {
//     type: UPDATE_DIRECTION,
//     payload: { id, value }
//   };
// };


// // deleting direction from the state
// const deleteDirection = (id) => {
//   return {
//     type: DELETE_DIRECTION,
//     payload: { id }
//   };
// };


// // Dish type
// const updateDishType = (event) => {
//   const value = event.target.value;

//   return {
//     type: UPDATE_DISHTYPE,
//     payload: {
//       value
//     }
//   };
// };

// // Description
// const updateDescr = (event) => {
//   const value = event.target.value;

//   return {
//     type: UPDATE_DESCR,
//     payload: {
//       value
//     }
//   };
// };


// // handling files
// const handleFiles = (e) => {
//   // console.dir(e.target.name);
//   // console.dir(e.target.files);
  
//   return {
//     type: UPDATE_FILES,
//     payload: {
//       files: e.target.files,
//       name: e.target.name
//     }
//   }
// };



export default {
  handleError
  // createIngredient,
  // editIngredient,
  // updateIngredient,
  // deleteIngredient,

  // createDirection,
  // editDirection,
  // updateDirection,
  // deleteDirection,

  // updateDishType,
  // updateDescr,
  // handleFiles
};