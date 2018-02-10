import { STORE_RESULT, DELETE_RESULT } from "./actionsTypes";

export const saveResult = res => {
  return {
    type: STORE_RESULT,
    result: res
  };
};

export const storeResult = result => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const oldCounter = getState().ctr.counter;
      dispatch(saveResult(result));
    }, 2000);
  };
};

export const deleteResult = resultElId => {
  return {
    type: DELETE_RESULT,
    resultElId
  };
};
