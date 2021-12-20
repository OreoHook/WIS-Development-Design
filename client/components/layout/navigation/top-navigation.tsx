import type { VFC } from "react";
import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import { AddButton } from "./add-button";
import { ColorModeSwitcher } from "./color-mode";

export const TopNavigation: VFC = () => {
  return (
    <Box
      bg={useColorModeValue("#fcfcfc", "gray.900")}
      px={4}
      position="fixed"
      width="100%"
      zIndex="55"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        w={["90%", "85%", "80%"]}
        maxW={900}
        mx="auto"
      >
        <HStack spacing={8} alignItems="center">
          <AddButton />
        </HStack>
        <Flex alignItems="center">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>
    </Box>
  );
};
