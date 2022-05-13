import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReactNode } from "react";

import Select, { PropsSelect } from "./Select";

export default {
  title: "Select", // Выписываю название компонента можно делат иерархию
  component: Select,
  argTypes: {
    // Описываю аргументы(пропсы) селекта , их тип и за что отвечают
    type: {
      type: "string",
      description: "Тип инпута",
    },
    className: {
      type: "string",
      defaultValue: "select",
    },
    title: {
      type: "string" || null,
      description: "Название селекта",
    },
    value: {
      type: "string",
    },
    list: {
      type: "string" || null,
      description: "Список элементов",
      defaultValue: ["abc", "def", "ghi"],
      control: {
        type: "radio",
      },
    },
    hiddenOption: {
      type: "boolean",
      description: "Скрыть option",
    },
  },
} as ComponentMeta<typeof Select>;

const Default = (
  arg: JSX.IntrinsicAttributes & PropsSelect & { children?: ReactNode }
) => <Select {...arg} />; // беру аргументы из компоненента

export const Primary: any = Default.bind({}); // Создаю дефолтые парметры
Primary.args = {
  title: "Имя",
  type: "select",
};

export const CustomSelect: any = Default.bind({});
CustomSelect.args = {
  title: "Название",
  type: "select",
  list: ["123", "456", "789"],
};
