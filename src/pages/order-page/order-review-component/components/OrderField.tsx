import "./styles.scss";

interface IProps {
  description?: string;
  fontSize?: string;
  value: string;
}
export const OrderField = ({ description, value, fontSize }: IProps) => {
  return (
    <div className="orderField">
      <span>{description}</span>
      <span style={{ fontSize: fontSize }}>{value}</span>
    </div>
  );
};
