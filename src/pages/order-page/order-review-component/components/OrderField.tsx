import "./styles.scss";

interface IProps {
  description?: string;
  fontSize?: string;
  value?: string | number;
  amount?: string;
}
export const OrderField = ({
  description,
  value,
  fontSize,
  amount,
}: IProps) => {
  return (
    <div className="orderField">
      <span>{description}</span>
      <span style={{ fontSize: fontSize }}>{value}</span>
      {amount && <span>{amount}</span>}
    </div>
  );
};
