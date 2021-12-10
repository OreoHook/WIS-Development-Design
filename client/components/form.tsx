import type { VFC } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useContext, useCallback } from "react";
import { AppContext } from "store/context";
import { FormActionsTypes, FormMethodsTypes } from "store/types";
import useSWR, { mutate } from "swr";
import type { IDepartment, IProfessor } from "lib/types";
import { useForm } from "react-hook-form";
import { professorSex } from "lib/data";
import { mutateCreateProfessor, mutateUpdateProfessor } from "lib/mutate-utils";

export const Form: VFC = () => {
  const {
    state: { form },
    dispatch,
  } = useContext(AppContext);
  const { data: departments } = useSWR<IDepartment[]>("/api/departments");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IProfessor>({
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

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/professors/${form._id}`)
        .then((r) => r.json())
        .then((d) =>
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

  const onSubmitClickHandler = (formData: IProfessor) => {
    mutate("/api/professors", async (professors: IProfessor[]) => {
      if (form.method === FormMethodsTypes.Update) {
        return mutateUpdateProfessor(professors, {
          professorId: form._id,
          formData,
        });
      } else {
        return mutateCreateProfessor(professors, formData);
      }
    }).then(() => {
      dispatch({ type: FormActionsTypes.CloseForm, payload: {} });
      if (form.method === FormMethodsTypes.Update) {
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

  const onCloseClickHandler = useCallback(() => {
    dispatch({ type: FormActionsTypes.CloseForm, payload: {} });
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmitClickHandler)}>
      {/* Кафедра */}

      <FormControl
        isInvalid={Boolean(errors?.department)}
        isRequired
        id="department"
      >
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
        <FormErrorMessage>
          {errors.department && errors.department.message}
        </FormErrorMessage>
      </FormControl>

      {/* Должность */}

      <FormControl
        mt={8}
        isInvalid={Boolean(errors?.position)}
        isRequired
        id="position"
      >
        <FormLabel>Должность</FormLabel>
        <Input
          {...register("position", {
            required: "Обязательно для заполнения",
          })}
          name="position"
          placeholder="Введите должность преподавателя"
        />
        <FormErrorMessage>
          {errors.position && errors.position.message}
        </FormErrorMessage>
      </FormControl>

      {/* Ученая степень */}

      <FormControl
        mt={8}
        isInvalid={Boolean(errors?.academicDegree)}
        isRequired
        id="academicDegree"
      >
        <FormLabel>Ученая степень</FormLabel>
        <Input
          {...register("academicDegree", {
            required: "Обязательно для заполнения",
          })}
          name="academicDegree"
          placeholder="Введите ученую степень преподавателя"
        />
        <FormErrorMessage>
          {errors.academicDegree && errors.academicDegree.message}
        </FormErrorMessage>
      </FormControl>

      {/* ФИО */}

      <FormControl
        mt={8}
        isInvalid={Boolean(errors?.fullName)}
        isRequired
        id="fullName"
      >
        <FormLabel>ФИО</FormLabel>
        <Input
          {...register("fullName", {
            required: "Обязательно для заполнения",
          })}
          name="fullName"
          placeholder="Введите ФИО преподавателя"
        />
        <FormErrorMessage>
          {errors.fullName && errors.fullName.message}
        </FormErrorMessage>
      </FormControl>

      {/* Пол */}

      <FormControl mt={8} isInvalid={Boolean(errors?.sex)} isRequired id="sex">
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
        <FormErrorMessage>{errors.sex && errors.sex.message}</FormErrorMessage>
      </FormControl>

      {/* Паспортные данные */}

      <FormControl
        mt={8}
        isInvalid={Boolean(errors?.passport)}
        isRequired
        id="passport"
      >
        <FormLabel>Паспортные данные</FormLabel>
        <Input
          {...register("passport", {
            required: "Обязательно для заполнения",
          })}
          name="passport"
          placeholder="Введите паспортные данные преподавателя"
        />
        <FormErrorMessage>
          {errors.passport && errors.passport.message}
        </FormErrorMessage>
      </FormControl>

      {/* Дата рождения */}

      <FormControl
        mt={8}
        isInvalid={Boolean(errors?.dateOfBirth)}
        isRequired
        id="dateOfBirth"
      >
        <FormLabel>Дата рождения</FormLabel>
        <Input
          type="date"
          {...register("dateOfBirth", {
            required: "Обязательно для заполнения",
          })}
          name="dateOfBirth"
          placeholder="Введите дату рождения преподавателя"
        />
        <FormErrorMessage>
          {errors.dateOfBirth && errors.dateOfBirth.message}
        </FormErrorMessage>
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
