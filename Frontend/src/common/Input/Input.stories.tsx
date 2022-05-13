import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReactNode } from "react";

import Input, { PropsInput } from "./Input";

export default {
  title: "Input", // Выписываю название компонента можно делат иерархию
  component: Input,
  argTypes: {
    // Описываю аргументы(пропсы) кнопки , их тип и за что отвечают
    type: {
      type: "string",
      description: "Тип инпута",
    },
    title: {
      type: "string",
      description: "Название инпута",
    },
    value: {
      type: "string",
    },
    minLength: {
      type: "string",
      description: "Минимальное количество символов",
    },
    pattern: {
      type: "string",
      description: "Regex",
    },
    required: {
      type: "boolean",
      description: "Обязательно для заполнения",
    },
  },
} as ComponentMeta<typeof Input>;

const Default = (
  arg: JSX.IntrinsicAttributes & PropsInput & { children?: ReactNode }
) => <Input {...arg} />; // беру аргументы из компоненента

export const Primary: any = Default.bind({}); // Создаю дефолтые парметры
Primary.args = {
  title: "Имя",
  type: "text",
};

export const CustomInput: any = Default.bind({});
CustomInput.args = {
  title: "Жалоба",
  type: "text",
};
