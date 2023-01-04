import { FC } from "react";
import * as FeatherIcons from "react-feather";

interface IProps {
  icon: keyof typeof FeatherIcons;
  size?: number;
  color?: string;
}

export const AppIcon: FC<IProps> = ({ icon, size = 20, color = "black" }) => {
  const Icon = FeatherIcons[icon];

  return <Icon {...{ size, color }} />;
};
