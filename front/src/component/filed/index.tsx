import { ChangeEvent, ChangeEventHandler, useMemo, useState } from "react";
import "./index.css";
import { emailRegex, passwordRegex } from "../../utils/regex";
import eye from "../../assets/svg/Eye.svg";
import eyeHide from "../../assets/svg/eye-hide.svg";
type filedTypes = "text" | "email" | "password";

const alertDescription: { [key in filedTypes]: any } = {
  text: "",
  email: "Sorry, email is wrong",
  password: "Sorry, the password is too simple",
};

enum validStatus {
  DEFAULT,
  VALID,
  INVALID,
}
type handlerFieldData = {
  isValid: boolean;
  value: string;
};

type fieldProps = {
  name: string;
  type?: filedTypes;
  placeholder?: string;
  optional?: boolean;
  handler?: (data: handlerFieldData) => void;
};

export const Field = ({
  name,
  type = "text",
  optional = false,
  placeholder,
  handler,
}: fieldProps) => {
  const [valid, setValid] = useState<validStatus>(validStatus.DEFAULT);
  const [value, setValue] = useState<string>("");
  const [visibility, setVisibility] = useState(false);

  const handlerVisibility = () => {
    setVisibility((prev) => !prev);
  };

  useMemo(() => {
    if (handler)
      handler({
        isValid: valid !== validStatus.INVALID ? true : false,
        value,
      });
  }, [value, valid]);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setValue(value);
    if (!value) {
      return setValid(optional ? validStatus.DEFAULT : validStatus.INVALID);
    }
    switch (type) {
      case "email":
        setValid(
          emailRegex.test(value) ? validStatus.VALID : validStatus.INVALID
        );
        break;
      case "password":
        setValid(
          passwordRegex.test(value) ? validStatus.VALID : validStatus.INVALID
        );
        break;
      default:
        setValid(validStatus.VALID);
        break;
    }
  };

  return (
    <div className="field">
      <label>{name}</label>
      <div
        className={`field__block__input ${
          valid === validStatus.VALID && "input--valid"
        }   ${valid === validStatus.INVALID && "input--not-valid"}`}
      >
        <input
          className="field__input"
          onChange={(e) => {
            handlerChange(e);
          }}
          value={value}
          type={type === "password" && visibility ? "text" : type}
          placeholder={placeholder}
        />
        {type === "password" && (
          <img
            onClick={handlerVisibility}
            className="field__view"
            src={visibility ? eyeHide : eye}
          ></img>
        )}
      </div>
      <span className="field-alert">
        {valid === validStatus.INVALID && alertDescription[type]}
      </span>
    </div>
  );
};
