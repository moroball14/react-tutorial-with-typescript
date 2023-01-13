import { SquareAll } from "./types";

const Square = ({
  value,
  onSquareClick,
}: {
  value: SquareAll;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};
export default Square;
