import { FormMethodsTypes } from "./types";

export type FormActionsPayload = {
  _id?: string;
  isOpen?: boolean;
};

export type FromState = FormActionsPayload & {
  method?: FormMethodsTypes;
};

export type InitialStateType = {
  form: FromState;
};

export const initialState: InitialStateType = {
  form: {
    isOpen: false,
  },
};
