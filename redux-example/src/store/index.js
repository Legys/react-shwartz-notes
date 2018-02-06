import { createStore, combineReducers } from "redux";
import personReducer from "./persons/reducer";

const rootReducer = combineReducers({
  person: personReducer
});

const store = createStore(rootReducer);
export default store;
