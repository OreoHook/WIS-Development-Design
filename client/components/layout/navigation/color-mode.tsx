import type { VFC } from "react";
import { useCallback } from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButtonProps,
  IconButton,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: VFC<ColorModeSwitcherProps> = ({
  ...props
}) => {
  const { toggleColorMode } = useColorMode();
  const mode = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const onClickHandler = useCallback(() => {
    toggleColorMode();
  }, [toggleColorMode]);

  return (
    <IconButton
      size="md"
      fontSize="md"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={onClickHandler}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${mode} mode`}
      {...props}
    />
  );
};
