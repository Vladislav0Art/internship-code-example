import { combineReducers } from 'redux';

// reducers
import GeneralReducer from './GeneralReducer';
import ModalReducer from './ModalReducer'; 
import UserReducer from './UserReducer';
import MenuReducer from './MenuReducer';
import AuthReducer from './AuthReducer';
import PostCreationReducer from './PostCreationReducer';

const rootReducer = combineReducers({
  GeneralReducer, ModalReducer, UserReducer, MenuReducer, AuthReducer, PostCreationReducer
});

export default rootReducer; 