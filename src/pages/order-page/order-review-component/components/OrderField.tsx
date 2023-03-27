import "./styles.scss";

interface IProps {
  description: string;
  value: string;
}
export const OrderField = ({ description, value }: IProps) => {
  return (
    <div className="orderField">
      <span>{description}</span>
      <span>{value}</span>
    </div>
  );
};
