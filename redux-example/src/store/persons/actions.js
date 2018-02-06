export const addPerson = person => {
  return { type: "ADD_PERSON", payload: { person } };
};

export const deletePerson = personId => {
  return { type: "DELETE_PERSON", payload: { personId } };
};
