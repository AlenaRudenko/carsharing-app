import "./style.scss";

interface IProps {
  text: string;
  fullDescription: string;
}

export const Description = ({ text, fullDescription }: IProps) => {
  return (
    <div className="description__container">
      <span>{text}</span>
      <span>{fullDescription}</span>
    </div>
  );
};
