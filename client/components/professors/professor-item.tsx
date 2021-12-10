import {
  Box,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Tag,
  Icon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import type { VFC } from "react";
import { useContext, useCallback } from "react";
import { AppContext } from "store/context";
import { FormActionsTypes } from "store/types";
import type { IProfessor } from "lib/types";
import { MdDeleteOutline, MdOutlineCreate } from "react-icons/md";
import { mutate } from "swr";
import { mutateDeleteProfessor } from "lib/mutate-utils";

export const ProfessorItem: VFC<IProfessor> = ({
  department,
  position,
  academicDegree,
  fullName,
  sex,
  _id,
}) => {
  const {
    state: { form },
    dispatch,
  } = useContext(AppContext);
  const toast = useToast();

  const onUpdateClickHandler = useCallback(() => {
    dispatch({ type: FormActionsTypes.OpenFormUpdate, payload: { _id: _id } });
  }, [_id, dispatch]);

  const onDeleteClickHandler = async (
  ) => {
    mutate('/api/professors', async (professors: IProfessor[]) =>
      mutateDeleteProfessor(professors, { professorId: _id })
    ).then(() => {
      return toast({
        title: "Преподаватель успешно удален.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Box
      size="xl"
      py={2}
      px={[2, 4]}
      mt={2}
      rounded="xl"
      borderWidth="1px"
      bg={useColorModeValue("white", "gray.900")}
      borderColor={useColorModeValue("gray.100", "#0a0a0a")}
      _hover={{
        shadow: "lg",
        textDecoration: "none",
      }}
    >
      <VStack overflow="hidden" align="start" spacing={1}>
        <VStack spacing={1} align="start" w="100%">
          <Flex justifyContent="space-between" width="100%">
            <Text
              fontSize="sm"
              noOfLines={1}
              fontWeight="600"
              align="left"
              color={useColorModeValue("black", "white")}
            >
              {fullName}
            </Text>
            <HStack>
              <Box
                mr={2}
                cursor="pointer"
                _hover={{ color: "orange" }}
                onClick={onUpdateClickHandler}
              >
                <Icon as={MdOutlineCreate} boxSize="1.1em" />
              </Box>
              <Box
                cursor="pointer"
                _hover={{ color: "red" }}
                onClick={onDeleteClickHandler}
              >
                <Icon as={MdDeleteOutline} boxSize="1.1em" />
              </Box>
            </HStack>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Box>
              <HStack spacing="1">
                <Tag size="sm" colorScheme="gray">
                  <Text fontSize={["0.55rem", "inherit", "inherit"]}>
                    {sex}
                  </Text>
                </Tag>
              </HStack>
            </Box>
          </Flex>
        </VStack>
        <Box>
          <Text color="gray.500" fontSize="sm" noOfLines={2} textAlign="left">
            {department}
            {", "}
            {academicDegree}
            {", "}
            {position}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
