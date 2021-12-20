import type { VFC } from "react";
import { useContext, useCallback } from "react";
import {
  Modal as ModalBase,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Form } from "../form";
import { AppContext } from "store/context";
import { FormActionsTypes } from "store/types";

export const Modal: VFC = () => {
  const {
    state: { form },
    dispatch,
  } = useContext(AppContext);

  const onClickHandler = useCallback(() => {
    dispatch({ type: FormActionsTypes.CloseForm, payload: {} });
  }, [dispatch]);

  return (
    <ModalBase
      scrollBehavior="inside"
      size="xl"
      isOpen={Boolean(form.isOpen)}
      onClose={onClickHandler}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Заполните данные преподавателя</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form />
        </ModalBody>

        {/* Только для увеличения пространства снизу модалки */}
        <ModalFooter />
      </ModalContent>
    </ModalBase>
  );
};
