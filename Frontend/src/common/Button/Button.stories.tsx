import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReactNode } from "react";

import Button, { PropsButton } from "./Button";

export default {
  title: "Button", // Выписываю название компонента можно делат иерархию
  component: Button,
  argTypes: {
    // Описываю аргументы(пропсы) кнопки , их тип и за что отвечают
    width: {
      type: "string",
      description: "Размер кнопки",
    },
    title: {
      type: "string",
      description: "Название конпки",
    },
    disabled: {
      type: "boolean",
    },
    type: {
      type: "string",
      description: "Стиль для кнопки",
      defaultValue: "",
      options: ["button-in-form", "contained", "default"], //
      control: {
        type: "radio",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Default = (
  arg: JSX.IntrinsicAttributes & PropsButton & { children?: ReactNode }
) => <Button {...arg} />; // беру аргументы из компоненента

export const Primary: any = Default.bind({}); // Создаю дефолтые парметры
Primary.args = {
  title: "Кнопка",
  type: "",
};

export const FormButton: any = Default.bind({});
FormButton.args = {
  title: "Кнопка в форме",
  type: "button-in-form",
};
