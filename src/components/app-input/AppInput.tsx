import {
  ChangeEvent,
  ComponentProps,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import { COLORS } from "../../constants/colors";
import { TEvent } from "../../interfaces/event";
import { AppIcon } from "../app-icon/AppIcon";
import "./styles.scss";

interface IProps {
  id?: string;
  iconColor?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeText?: (text: string) => void;
  label: string;
  typeField?: HTMLInputTypeAttribute;
  leftIcon?: TIconProps["icon"];
  isDisabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  themeColor?: string;
}
type TIconProps = ComponentProps<typeof AppIcon>;

export const AppInput = ({
  id,
  onChangeText,
  value,
  iconColor,
  onChange,
  label,
  typeField = "text",
  leftIcon,
  placeholder,
  errorMessage,
  hasError,
  isDisabled,
  themeColor = COLORS.PRIMARY,
}: IProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible((prev) => !prev);
  };
  const handleChange = (e: TEvent) => {
    onChange?.(e);
    onChangeText?.(e.target.value);
  };
  const currentColor = value
    ? hasError
      ? COLORS.RED
      : themeColor
    : COLORS.GREY;

  return (
    <div className='input__field'>
      <div className='input__container'>
        <label>{label}</label>
        <div className={"input__group"}>
          {!!leftIcon && (
            <AppIcon size={18} color={currentColor} icon={leftIcon} />
          )}
          <input
            id={id}
            type={isVisible ? "text" : typeField}
            className='input__form'
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />

          {typeField === "password" && (
            <div className={""} onClick={toggleIsVisible}>
              {isVisible ? (
                <AppIcon size={18} icon={"Eye"} />
              ) : (
                <AppIcon size={18} icon={"EyeOff"} />
              )}
            </div>
          )}
        </div>
        <div className='info'>
          {value && hasError && (
            <span style={{ color: currentColor }} className={"info__message"}>
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
