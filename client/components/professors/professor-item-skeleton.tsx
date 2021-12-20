import type { VFC } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export const ProfessorItemSkeleton: VFC = () => {
  const bgColor = useColorModeValue("white", "#000000");
  const professors = [0, 1, 2, 3];

  return (
    <>
      {professors.map((index) => {
        return (
          <Box
            key={index}
            size="xl"
            py={2}
            rounded="xl"
            borderWidth="1px"
            bg={bgColor}
            height="100px"
            width="100%"
          />
        );
      })}
    </>
  );
};
