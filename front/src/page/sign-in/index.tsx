import { PageContent } from "../../component/page-content";
import "./index.css";
import { PageTitle } from "../../component/page-title";
import { Header } from "../../component/header";
import { Field } from "../../component/filed";
import { Button } from "../../component/button";

import { QuestionRedirect } from "../../component/question-redirect";
import { Alert } from "../../component/alert";

type SignInPageType = {
  emailHandler: any;
  passwordHandler: any;
  submitHandler: any;
  submitIsActive: any;
  isAlert: any;
};
export const SignInPage = ({
  emailHandler,
  passwordHandler,
  submitHandler,
  submitIsActive,
  isAlert,
}: SignInPageType) => {
  return (
    <div className="page">
      <PageContent>
        <Header />
        <PageTitle title="Sign in" subTitle="Choose a registration method" />
        <Field
          defaultValue="123@ga.com"
          name="Email"
          handler={emailHandler}
          type="email"
        />
        <Field
          defaultValue="qwertyW123"
          name="Password"
          handler={passwordHandler}
          type="password"
        />
        <QuestionRedirect
          question=" Forgot your password?"
          redirectText="Restore"
          redirectTo="/recovery"
        />
        <Button isActive={submitIsActive} onClick={submitHandler}>
          Continue
        </Button>
        {isAlert && <Alert message={isAlert} />}
      </PageContent>
    </div>
  );
};
