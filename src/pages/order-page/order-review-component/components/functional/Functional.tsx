import "./style.scss";

interface IProps {
  text: string;
}

export const Functional = ({ text }: IProps) => {
  return (
    <div className="functional__container">
      <span>{text}</span>
    </div>
  );
};
