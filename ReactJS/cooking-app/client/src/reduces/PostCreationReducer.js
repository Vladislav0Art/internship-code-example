import {
  // GENERAL_ERROR,
  // CLEAR_GENERAL_MESSAGES
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
} from './types';


const initialState = {
  error: null
  // dishType: '',
  // descr: '',
  // ingredients: [],
  // directions: [],
  // thumbnail: null,
  // images: [],
  // video: null
};


const PostCreationReducer = (state = initialState, action) => {
  switch(action.type) {
    // // INGREDIENTS
    // // creating new ingredient
    // case CREATE_INGREDIENT:
    //   return {
    //     ...state,
    //     ingredients: [...state.ingredients, action.payload.ingredient ]
    //   };

    // // switching to edit mode
    // case EDIT_INGREDIENT:
    //   return {
    //     ...state,
    //     ingredients: state.ingredients.map((item) => {
    //       item.isEditing = (item.id === action.payload.id);
    //       return item;
    //     })
    //   };

    // // updating text value of ingredient
    // case UPDATE_INGREDIENT:
    //   return {
    //     ...state,
    //     ingredients: state.ingredients.map(item => {
    //       if(item.id === action.payload.id) {
    //         item.isEditing = false;
    //         item.text = action.payload.value;
    //       }

    //       return item;
    //     })
    //   };

    // // deleting ingredient
    // case DELETE_INGREDIENT:
    //   return {
    //     ...state,
    //     ingredients: state.ingredients.filter(item => item.id !== action.payload.id)
    //   };

  
    // // DIRECTIONS
    // // creating new direction
    // case CREATE_DIRECTION:
    //   return {
    //     ...state,
    //     directions: [...state.directions, action.payload.direction ]
    //   };

    // // switching to edit mode
    // case EDIT_DIRECTION:
    //   return {
    //     ...state,
    //     directions: state.directions.map((item) => {
    //       item.isEditing = (item.id === action.payload.id);
    //       return item;
    //     })
    //   };

    // // updating text value of direction
    // case UPDATE_DIRECTION:
    //   return {
    //     ...state,
    //     directions: state.directions.map(item => {
    //       if(item.id === action.payload.id) {
    //         item.isEditing = false;
    //         item.text = action.payload.value;
    //       }

    //       return item;
    //     })
    //   };

    // // deleting directions
    // case DELETE_DIRECTION:
    //   return {
    //     ...state,
    //     directions: state.directions.filter(item => item.id !== action.payload.id)
    //   };

    // // Dish type
    // case UPDATE_DISHTYPE:
    //   return {
    //     ...state,
    //     dishType: action.payload.value
    //   };

    // // Description
    // case UPDATE_DESCR:
    //   return {
    //     ...state,
    //     descr: action.payload.value
    //   };

    // // Files
    // case UPDATE_FILES:
    //   console.log(action.payload.files);
    //   return {
    //     ...state,
    //     [action.payload.name]: action.payload.files
    //   }

    default:
      return state;
  }
};

export default PostCreationReducer;