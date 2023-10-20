import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";
import "./index.css";

type buttonProps = {
  onClick?: MouseEventHandler;
  children?: ReactElement | ReactElement[] | string;
  isOutside?: boolean;
  color?: string;
};

export const Button = ({
  onClick,
  children,
  isOutside,
  color,
}: buttonProps) => {
  return (
    <div
      onClick={onClick}
      style={(color && { "--color": color }) as CSSProperties}
      className={`button ${isOutside && "button--outside"}`}
    >
      {children}
    </div>
  );
};
