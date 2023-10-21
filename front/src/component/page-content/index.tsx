import React from "react";
import "./index.css";

export const PageContent = ({ children, isBetween }: any) => {
  return (
    <div className={`page__content ${isBetween && "page__content--between"}`}>
      {children}
    </div>
  );
};
