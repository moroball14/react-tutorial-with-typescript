import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Square from "./Square";
import { SquareAll } from "./types";

describe("Square", () => {
  const displayValue: SquareAll = "O";
  describe("表示", () => {
    it("渡された値を表示する", () => {
      render(<Square value={displayValue} onSquareClick={() => {}} />);

      expect(screen.getByText(displayValue)).toBeInTheDocument();
    });
  });
  describe("操作", () => {
    it("buttonを押すと、渡したonSquareClickが1回呼ばれる", () => {
      const mockedOnSquareClick = jest.fn();
      render(
        <Square value={displayValue} onSquareClick={mockedOnSquareClick} />
      );

      userEvent.click(screen.getByRole("button"));

      expect(mockedOnSquareClick).toBeCalledTimes(1);
    });
  });
});
