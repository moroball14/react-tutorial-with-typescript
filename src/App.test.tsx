import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./App";

describe("Game", () => {
  describe("表示", () => {
    it("初回描画時は「Next player: X」と「Go to game start」ボタンを表示する", () => {
      render(<Game />);
      expect(screen.getByText("Next player: X")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to game start" })
      ).toBeInTheDocument();
    });
  });
  describe("操作", () => {
    it("一つマスを押すと、「Next player: O」と「Go to move #1」ボタンを表示する", () => {
      render(<Game />);
      userEvent.click(screen.getAllByRole("button")[0]);
      expect(screen.getByText("Next player: O")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to move #1" })
      ).toBeInTheDocument();
    });
    it("3回ターンが過ぎて2ターン目に戻るボタンを押すと、2ターン目の表示に戻る", () => {
      render(<Game />);
      userEvent.click(screen.getAllByRole("button")[0]);
      expect(screen.getByText("Next player: O")).toBeInTheDocument();
      userEvent.click(screen.getAllByRole("button")[1]);
      expect(screen.getByText("Next player: X")).toBeInTheDocument();
      userEvent.click(screen.getAllByRole("button")[2]);

      // 3ターン目に進んでいること
      expect(screen.getByText("Next player: O")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to move #3" })
      ).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: "O" })).toHaveLength(1);
      expect(screen.getAllByRole("button", { name: "X" })).toHaveLength(2);

      userEvent.click(screen.getByRole("button", { name: "Go to move #2" }));
      // 2ターン目に戻っていること
      expect(screen.getByText("Next player: X")).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: "O" })).toHaveLength(1);
      expect(screen.getAllByRole("button", { name: "X" })).toHaveLength(1);
    });
  });
});
