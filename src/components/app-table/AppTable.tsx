import { Fragment } from "react";
import "./styles.scss";
interface IProps {
  title: string;
  value1?: string;
  value2: string;
}

export const AppTable = ({ title, value1, value2 }: IProps) => {
  return (
    <Fragment key={title}>
      <table>
        <tbody>
          <tr>
            <td>{title}</td>
            {value1 && <td>{value1}</td>}
            <td>{value2}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
