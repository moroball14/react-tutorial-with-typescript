import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";
import { SquareAll } from "./types";

const sampleXIsNext = true;
const sampleSquares: SquareAll[] = [
  "O",
  "X",
  null,
  "X",
  "O",
  "O",
  "X",
  null,
  null,
];
const sampleOnPlay = () => {};
describe("Board", () => {
  describe("表示", () => {
    it("渡された状態(OX)を表示する", () => {
      expect.hasAssertions();
      render(
        <Board
          xIsNext={sampleXIsNext}
          squares={sampleSquares}
          onPlay={sampleOnPlay}
        />
      );
      const buttons = screen.getAllByRole("button");
      sampleSquares.forEach((square, i) => {
        const expected = square !== null ? square : "";
        expect(buttons[i]).toHaveTextContent(expected);
      });
    });
    describe("現在のターン", () => {
      it("xIsNextがtrueの場合、Next player: Xが表示される", () => {
        render(
          <Board xIsNext={true} squares={sampleSquares} onPlay={sampleOnPlay} />
        );
        expect(screen.getByText("Next player: X")).toBeInTheDocument();
      });
      it("xIsNextがfalseの場合、Next player: Oが表示される", () => {
        render(
          <Board
            xIsNext={false}
            squares={sampleSquares}
            onPlay={sampleOnPlay}
          />
        );
        expect(screen.getByText("Next player: O")).toBeInTheDocument();
      });
    });
    describe("勝者", () => {
      // it.eachでいくつかのパターンを試しても良いかも
      it("Oが3マス揃うと、Winner: Oが表示される", () => {
        render(
          <Board
            xIsNext={sampleXIsNext}
            squares={["O", "O", "O", "X", null, "X", "X", null, null]}
            onPlay={sampleOnPlay}
          />
        );
        expect(screen.getByText("Winner: O")).toBeInTheDocument();
      });
      it("Xが3マス揃うと、Winner: Xが表示される", () => {
        render(
          <Board
            xIsNext={sampleXIsNext}
            squares={["O", "O", null, "X", "X", "X", null, null, "O"]}
            onPlay={sampleOnPlay}
          />
        );
        expect(screen.getByText("Winner: X")).toBeInTheDocument();
      });
    });
  });
  describe("操作", () => {
    it("すでに値があるマスをクリックしても、ターンは変わらない(渡されたonPlayは一回も呼ばれない)", () => {
      const mockedOnPlay = jest.fn();
      render(
        <Board
          xIsNext={sampleXIsNext}
          squares={["O", "O", null, "X", null, "X", null, null, "O"]}
          onPlay={mockedOnPlay}
        />
      );
      // xIsNext = trueなので
      expect(screen.getByText("Next player: X")).toBeInTheDocument();
      const filledButton = screen.getAllByRole("button")[0];
      userEvent.click(filledButton);
      // 本当なら変わるはずだが、すでに埋まっているマスをクリックしたので変わらない
      expect(screen.getByText("Next player: X")).toBeInTheDocument();
      // onPlayも呼ばれない
      expect(mockedOnPlay).toBeCalledTimes(0);
    });
    it("すでに勝者が決まっている場合にマスをクリックしても、何も起きない(渡されたonPlayは一回も呼ばれない)", () => {
      const mockedOnPlay = jest.fn();
      render(
        <Board
          xIsNext={sampleXIsNext}
          squares={["O", "O", "O", "X", null, "X", null, null, null]}
          onPlay={mockedOnPlay}
        />
      );
      // xIsNext = trueだけどすでに勝敗決まったので
      expect(screen.getByText("Winner: O")).toBeInTheDocument();
      const filledButton = screen.getAllByRole("button")[0];
      userEvent.click(filledButton);
      // onPlayも呼ばれない
      expect(mockedOnPlay).toBeCalledTimes(0);
    });
    it("空いているマスをクリックして勝者が決まらない場合、渡されたonPlayが一回呼ばれる", () => {
      const mockedOnPlay = jest.fn();
      render(
        <Board
          xIsNext={sampleXIsNext}
          squares={["O", "O", null, "X", "O", "X", null, null, null]}
          onPlay={mockedOnPlay}
        />
      );
      // xIsNext = trueだけどすでに勝敗決まったので
      expect(screen.getByText("Next player: X")).toBeInTheDocument();
      const emptyButton = screen.getAllByRole("button")[7];
      userEvent.click(emptyButton);
      expect(mockedOnPlay).toBeCalledTimes(1);
    });
  });
});
