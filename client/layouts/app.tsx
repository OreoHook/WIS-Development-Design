import type { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";
import { TopNavigation } from "components/layout/navigation/top-navigation";
import { Modal } from "components/layout/modal";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      {/* Верхняя панель с кнопкой добавить и переключенем цветового режима */}
      <TopNavigation />
      <Box
        textAlign="center"
        fontSize="xl"
        w={["90%", "85%", "80%"]}
        maxW={900}
        mx="auto"
      >
        <Box pt="7rem" pb={10}>
          {children}
        </Box>
      </Box>

      {/* Модалка с формой */}
      <Modal />
    </>
  );
}
