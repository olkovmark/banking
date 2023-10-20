import React from "react";
import backgroundImg from "./background.png";
import moneyImg from "./money.png";
import "./index.css";
import { PageContent } from "../../component/page-content";
import { Button } from "../../component/button";
import { Link, Navigate } from "react-router-dom";

export const WellcomePage = () => {
  const login = () => {};
  const registration = () => {};

  return (
    <div className="page">
      <div className="background__img"></div>
      <PageContent>
        <div className="heading">
          <h1 className="heading__title">Hello!</h1>
          <h4 className="heading__sub__title">Welcome to bank app</h4>
        </div>
        <div className="form">
          <Link to="/signup">
            <Button isOutside onClick={registration}>
              Sign Up
            </Button>
          </Link>
          <Link to="/signin">
            <Button onClick={login}> Sign In</Button>
          </Link>
        </div>
      </PageContent>
    </div>
  );
};
