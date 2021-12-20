export type FormActionsPayload = {
  _id?: string;
  isOpen?: boolean;
};

export type FromState = FormActionsPayload & {
  method?: "create" | "update";
};

export type InitialStateType = {
  form: FromState;
};

export const initialState: InitialStateType = {
  form: {
    isOpen: false,
  },
};
