import { SimpleGrid, Box } from "@chakra-ui/react";
import type { VFC } from "react";
import { ProfessorItem } from "./professor-item";
import useSWR from "swr";
import type { IProfessor } from "lib/types";
import { ProfessorItemSkeleton } from "./professor-item-skeleton";

export const Professors: VFC = () => {
  const { data: professors } = useSWR<IProfessor[]>("/api/professors");

  return (
    <>
      {/* Если данные пока не загрузились, показываем скелетную загрузку */}
      {!professors ? (
        <SimpleGrid columns={[1, 1, 2]} spacing={4} mt={4}>
          <ProfessorItemSkeleton />
        </SimpleGrid>
      ) : (
        <Box mt={4}>
          <SimpleGrid columns={[1, 1, 2]} spacing={4} mt={4}>
            {professors.map((professor) => (
              <ProfessorItem {...professor} key={professor._id} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};
