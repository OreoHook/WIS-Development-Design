import { FormActionsTypes } from "./types";
import type { FormActionsPayload } from "./state";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type FormPayload = {
  [FormActionsTypes.OpenFormCreate]: FormActionsPayload;
  [FormActionsTypes.OpenFormUpdate]: FormActionsPayload;
  [FormActionsTypes.CloseForm]: FormActionsPayload;
};

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

export type Actions = FormActions;
