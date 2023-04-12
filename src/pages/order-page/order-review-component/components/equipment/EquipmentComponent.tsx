import "./style.scss";

interface IProps {
  text: string;
}

export const EquipmentComponent = ({ text }: IProps) => {
  return (
    <div className="equipment__container">
      <span>{text}</span>
    </div>
  );
};
