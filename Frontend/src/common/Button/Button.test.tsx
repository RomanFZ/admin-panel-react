import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("Button render", () => {
    render(<Button title={"Кнопка"} />);
    expect(screen.getByText("Кнопка")).toBeInTheDocument(); // проверить если такой список в компоненте
  });

  test("not Text in ", () => {
    render(<Button title={"Кнопка"} />);
    expect(screen.queryByRole("")).toBeNull(); // проверил есть ли список в компоненте
  });

  test("List snapshot", () => {
    const list = render(<Button title={"Кнопка"} />);
    expect(list).toMatchSnapshot();
  });
});
