export const tableHeading = ["Имя", "Врач", "Дата", "Жалоба", ""];

export const doctorName = ["Терапевт", "Хирург", "Стоматолог", "Кардиолог"];

export const sortOption = [
  {
    name: "Имя",
    value: "name",
  },
  {
    name: "Врач",
    value: "doctor",
  },
  {
    name: "Дата",
    value: "date",
  },
  {
    name: "Очистить",
    value: "",
  },
];

export const sortDirection = [
  {
    name: "По возрастанию",
    value: "asc",
  },
  {
    name: "По убыванию",
    value: "desc",
  },
];

export const url = process.env.REACT_APP_URL_FETCH;
