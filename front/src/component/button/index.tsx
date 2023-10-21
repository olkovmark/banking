import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";
import "./index.css";

type buttonProps = {
  onClick?: MouseEventHandler;
  children?: ReactElement | ReactElement[] | string;
  isOutside?: boolean;
  color?: string;
  isActive?: boolean;
};

export const Button = ({
  onClick,
  children,
  isOutside,
  color,
  isActive = true,
}: buttonProps) => {
  return (
    <div
      onClick={(e) => {
        if (onClick && isActive) onClick(e);
      }}
      style={(color && { "--color": color }) as CSSProperties}
      className={`button 
      ${isOutside && "button--outside"} ${isActive && "button--active"}`}
    >
      {children}
    </div>
  );
};
