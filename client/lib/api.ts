import type { IProfessor } from "./types";
import fetch from "isomorphic-unfetch";

// Функции для работы с данными по сети ( CRUD операции )

export const createProfessor = async ({ formData }: { formData: IProfessor }) =>
  fetch("/api/professors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then((r) => r.json());

export const readProfessor = async ({
  professorId,
}: {
  professorId?: string;
}) => {
  return fetch(`/api/professors/${professorId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((r) => r.json());
};

export const updateProfessor = async ({
  professorId,
  formData,
}: {
  professorId?: string;
  formData: IProfessor;
}) => {
  const { _id, ...data } = formData;

  return fetch(`/api/professors/${professorId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
};

export const deleteProfessor = async ({
  professorId,
}: {
  professorId?: string;
}) =>
  fetch(`/api/professors/${professorId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((r) => r.json());
