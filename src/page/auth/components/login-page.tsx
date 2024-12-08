import { routes } from "@/config/routes";
import { LoginForm } from "./login-form";
import AuthWrapperForm from "../auth-wrapper-form";

export default function LoginPage() {
  return (
    <AuthWrapperForm
      title="Login"
      description={
        <>
          Enter your email and password below <br />
          to log into your account.
        </>
      }
      FormComponent={LoginForm}
      footerText="Don't have an account?"
      footerLink={routes.register}
      footerLinkText="Register"
    />
  );
}
