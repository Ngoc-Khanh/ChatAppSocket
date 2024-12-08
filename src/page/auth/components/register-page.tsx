import { routes } from "@/config/routes";
import RegisterForm from "./register-form";
import AuthWrapperForm from "../auth-wrapper-form";

export default function RegisterPage() {
  return (
    <AuthWrapperForm
      title="Register"
      description={
        <>
          Enter your email and password below <br />
          to register for an account.
        </>
      }
      FormComponent={RegisterForm}
      footerText="Already have an account?"
      footerLink={routes.login}
      footerLinkText="Login"
    />
  );
}
