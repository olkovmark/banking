import "./index.css";
import warning from "../../assets/svg/warning.svg";

export const Alert = ({ message }: { message: string }) => {
  return (
    <span className="alert">
      <img src={warning} alt="" />
      <p>{message}</p>
    </span>
  );
};
