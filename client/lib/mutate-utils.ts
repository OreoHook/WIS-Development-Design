import type { IProfessor } from "./types";
import { createProfessor, deleteProfessor, updateProfessor } from "./api";

// Готовые функции для мутирования данных и возвращения данных

export const mutateCreateProfessor = async (
  prevProfessors: IProfessor[],
  formData: IProfessor,
) => {
  const newProfessor = await createProfessor({ formData });

  return [newProfessor, ...prevProfessors];
};

export const mutateUpdateProfessor = async (
  prevProfessors: IProfessor[],
  { professorId, formData }: { professorId?: string; formData: IProfessor },
) => {
  const updatedProfessor = await updateProfessor({ professorId, formData });

  const filteredProfessors = prevProfessors.filter(
    (t) => t._id !== professorId,
  );

  return [...filteredProfessors, updatedProfessor];
};

export const mutateDeleteProfessor = async (
  prevProfessors: IProfessor[],
  { professorId }: { professorId?: string },
) => {
  return deleteProfessor({ professorId }).then(() =>
    prevProfessors.filter((t) => t._id !== professorId),
  );
};
