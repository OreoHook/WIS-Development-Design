import type { FC, Dispatch } from "react";
import { createContext, useReducer } from "react";
import type { Actions } from "./actions";
import { mainReducer } from "./reducers";
import { initialState, InitialStateType } from "./state";

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: FC = ({ children }) => {
  // pass an mainReducer, initialState
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
