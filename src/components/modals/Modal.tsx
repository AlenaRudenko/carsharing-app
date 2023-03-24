import React, { ComponentProps } from "react";
import { AppIcon } from "../app-icon/AppIcon";
import "./styles.scss";

interface IProps {
  children: React.ReactNode;
  isVisible: boolean;
  title: string;
  onClickBtnClose?: () => void;
  size?: string;
  leftButton?: ComponentProps<typeof AppIcon>["icon"] | undefined;
  onClickLeftButton?: () => void;
}

export const Modal = ({
  children,
  isVisible,
  title,
  onClickBtnClose,
  size = "small",
  leftButton,
  onClickLeftButton,
}: IProps) => {
  return (
    <div
      className={`base-modal base-modal${
        isVisible ? "--backdrop" : "--hidden"
      }`}
    >
      <div className={`base-modal__main base-modal__main--${size}`}>
        <div
          className={`base-modal__header base-modal__header--${
            size === "small" && "down"
          }`}
        >
          {leftButton && (
            <div onClick={onClickLeftButton} className='base-modal__leftButton'>
              <AppIcon icon={leftButton} />
            </div>
          )}
          {onClickBtnClose !== undefined && (
            <div onClick={onClickBtnClose} className='base-modal__btn-close'>
              <AppIcon icon={"X"} />
            </div>
          )}
          <div className='base-modal__topic'>
            <span>{title}</span>
          </div>
        </div>
        <div className='base-modal__content'>{children}</div>
      </div>
    </div>
  );
};
