import type { Reducer } from "react";
import type { Actions } from "./actions";
import type { FromState, InitialStateType } from "./state";
import { FormActionsTypes } from "./types";

export const formReducer = (state: FromState, action: Actions): FromState => {
  switch (action.type) {
    case FormActionsTypes.OpenFormCreate:
      return {
        ...state,
        isOpen: true,
        _id: undefined,
        method: "create",
      };

    case FormActionsTypes.OpenFormUpdate:
      return {
        ...state,
        isOpen: true,
        _id: action.payload._id,
        method: "update",
      };

    case FormActionsTypes.CloseForm:
      return {
        ...state,
        isOpen: false,
        _id: undefined,
        method: undefined,
      };

    default:
      return state;
  }
};

export const mainReducer: Reducer<InitialStateType, Actions> = (
  { form },
  action,
) => ({
  form: formReducer(form, action),
});
