import { Link } from "react-router-dom";

interface AuthWrapperFromProps {
  title: string;
  description: React.ReactNode;
  FormComponent: React.ComponentType;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export default function AuthWrapperForm({
  title,
  description,
  FormComponent,
  footerText,
  footerLink,
  footerLinkText,
}: AuthWrapperFromProps) {
  return (
    <div className="grid h-svh items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
        <div className="flex items-center justify-center"></div>
        <div className="w-full h-full p-4 m-4 border bg-background rounded">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <FormComponent />
          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              to={footerLink}
              className=" underline underline-offset-4 hover:text-primary"
            >
              {footerLinkText}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
