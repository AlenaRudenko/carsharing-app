import "./style.scss";
interface IProps {
  text?: string;
}
export const Tooltip = ({ text = "RRR" }) => {
  return (
    <div className="tooltip__container">
      <span>{text}</span>
    </div>
  );
};
