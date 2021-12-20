import type { VFC } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useContext, useCallback } from "react";
import { AppContext } from "store/context";
import { FormActionsTypes } from "store/types";
import useSWR, { mutate } from "swr";
import type { IDepartment, IProfessor } from "lib/types";
import { useForm } from "react-hook-form";
import { professorSex } from "lib/data";
import { mutateCreateProfessor, mutateUpdateProfessor } from "lib/mutate-utils";
import { readProfessor } from "lib/api";

export const Form: VFC = () => {
  const {
    state: { form },
    dispatch,
  } = useContext(AppContext);
  // Получение данных по кафедрам
  const { data: departments } = useSWR<IDepartment[]>("/api/departments");

  // Для работы уведомлений ( например, при создании преподователя )
  const toast = useToast();

  // Для удобства работы с формой ( библиотека react-hook-form ( https://react-hook-form.com/ ) )
  const { register, reset, handleSubmit } = useForm<IProfessor>({
    defaultValues: {
      _id: undefined,
      department: "",
      position: "",
      academicDegree: "",
      fullName: "",
      sex: "",
      passport: "",
      dateOfBirth: undefined,
      isCompleted: false,
    },
  });

  // Автозаполнение данных для формы обновления с сервера
  useEffect(() => {
    const fetchData = () => {
      readProfessor({ professorId: form._id }).then((d) =>
        reset({
          ...d,
          dateOfBirth: dayjs(d.dateOfBirth).format("YYYY-MM-DD"),
        }),
      );
    };

    if (form._id) {
      fetchData();
    }
  }, [form._id, reset]);

  // Действие по кнопке "Сохранить"
  const onSubmitClickHandler = (formData: IProfessor) => {
    // Функция для мутирования данных из библиотеки swr
    mutate("/api/professors", async (professors: IProfessor[]) => {
      // Проверка на действие с формой ( если обновить, вызывается мутирование обновления данных, если нет, мутирование создания данных )
      if (form.method === "update") {
        return mutateUpdateProfessor(professors, {
          professorId: form._id,
          formData,
        });
      } else {
        return mutateCreateProfessor(professors, formData);
      }
    }).then(() => {
      // Закрытие формы через контекст
      dispatch({ type: FormActionsTypes.CloseForm, payload: {} });
      // Отображение уведомления
      if (form.method === "update") {
        return toast({
          title: "Данные преподавателя обновлены.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        return toast({
          title: "Преподаватель создан.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  // Функция для закрытия формы по кнопке "Закрыть"
  const onCloseClickHandler = useCallback(() => {
    dispatch({ type: FormActionsTypes.CloseForm, payload: {} });
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmitClickHandler)}>
      {/* Кафедра */}

      <FormControl isRequired id="department">
        <FormLabel>Кафедра</FormLabel>
        <Select
          {...register("department", {
            required: "Обязательно для заполнения",
          })}
          name="department"
          placeholder="Выберите кафедру"
        >
          {departments?.map((department: IDepartment) => (
            <option key={department._id} value={department.title}>
              {department.title}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Должность */}

      <FormControl mt={8} isRequired id="position">
        <FormLabel>Должность</FormLabel>
        <Input
          {...register("position", {
            required: "Обязательно для заполнения",
          })}
          name="position"
          placeholder="Введите должность преподавателя"
        />
      </FormControl>

      {/* Ученая степень */}

      <FormControl mt={8} isRequired id="academicDegree">
        <FormLabel>Ученая степень</FormLabel>
        <Input
          {...register("academicDegree", {
            required: "Обязательно для заполнения",
          })}
          name="academicDegree"
          placeholder="Введите ученую степень преподавателя"
        />
      </FormControl>

      {/* ФИО */}

      <FormControl mt={8} isRequired id="fullName">
        <FormLabel>ФИО</FormLabel>
        <Input
          {...register("fullName", {
            required: "Обязательно для заполнения",
          })}
          name="fullName"
          placeholder="Введите ФИО преподавателя"
        />
      </FormControl>

      {/* Пол */}

      <FormControl mt={8} isRequired id="sex">
        <FormLabel>Пол</FormLabel>
        <Select
          {...register("sex", {
            required: "Обязательно для заполнения",
          })}
          name="sex"
          placeholder="Выберите пол преподавателя"
        >
          {professorSex.map((sex) => (
            <option key={sex._id} value={sex.title}>
              {sex.title}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Паспортные данные */}

      <FormControl mt={8} isRequired id="passport">
        <FormLabel>Паспортные данные</FormLabel>
        <Input
          {...register("passport", {
            required: "Обязательно для заполнения",
          })}
          name="passport"
          placeholder="Введите паспортные данные преподавателя"
        />
      </FormControl>

      {/* Дата рождения */}

      <FormControl mt={8} isRequired id="dateOfBirth">
        <FormLabel>Дата рождения</FormLabel>
        <Input
          type="date"
          {...register("dateOfBirth", {
            required: "Обязательно для заполнения",
          })}
          name="dateOfBirth"
          placeholder="Введите дату рождения преподавателя"
        />
      </FormControl>

      {/* Кнопка сохранения */}

      <Button colorScheme="blue" mt={8} mr={4} type="submit">
        Сохранить
      </Button>

      {/* Кнопка закрытия */}

      <Button mt={8} colorScheme="gray" onClick={onCloseClickHandler}>
        Закрыть
      </Button>
    </form>
  );
};
