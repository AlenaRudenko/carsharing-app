import "./style.scss";

interface IProps {
  text: string;
}
export const Description = ({ text }: IProps) => {
  return (
    <div className="description__container">
      <span>{text}</span>
    </div>
  );
};
