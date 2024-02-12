//holds the application state
import { createStore } from "redux";


// Initial state of the Redux store
const initialState = {
  data: [],
  loading: false,
};

//define how state should be updated based on dispatched actions
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer); //create store
export default store;
