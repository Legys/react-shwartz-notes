import * as actionTypes from "./constants";

const initialState = {
  persons: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_PERSON:
      const newPersons = [...state.persons];
      newPersons.push(payload.person);
      return {
        ...state,
        persons: newPersons
      };
    case actionTypes.DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== payload.personId)
      };
      return {
        ...state,
        persons: newPersons
      };
    default:
      return state;
  }
};

export default reducer;
