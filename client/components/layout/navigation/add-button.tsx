import { Button, useColorModeValue } from "@chakra-ui/react";
import { VFC } from "react";
import { useContext, useCallback } from "react";
import { AppContext } from "store/context";
import { FormActionsTypes } from "store/types";
import { AiOutlineUserAdd } from "react-icons/ai";

export const AddButton: VFC = () => {
  const { state, dispatch } = useContext(AppContext);

  const onClickHandler = useCallback(() => {
    dispatch({ type: FormActionsTypes.OpenFormCreate, payload: {} });
  }, [dispatch]);

  console.log(state.form.isOpen);

  return (
    <Button
      color={useColorModeValue("black", "white")}
      onClick={onClickHandler}
      leftIcon={<AiOutlineUserAdd />}
    >
      Добавить преподавателя
    </Button>
  );
};
