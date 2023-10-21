import { PageContent } from "../../component/page-content";
import "./index.css";
import { PageTitle } from "../../component/page-title";
import { Header } from "../../component/header";
import { Field } from "../../component/filed";
import { Button } from "../../component/button";

import { QuestionRedirect } from "../../component/question-redirect";
import { Alert } from "../../component/alert";

const emailHandler = (data: any) => {
  console.log(data);
};

export const SignInPage = () => {
  return (
    <div className="page">
      <PageContent>
        <Header />
        <PageTitle title="Sign in" subTitle="Choose a registration method" />
        <Field name="Email" handler={emailHandler} type="email" />
        <Field name="Password" type="password" />
        <QuestionRedirect
          question=" Forgot your password?"
          redirectText="Restore"
          redirectTo="/recovery"
        />
        <Button>Continue</Button>
        <Alert message="A user with the same name is already exist" />
      </PageContent>
    </div>
  );
};
