import { PasswordInput } from "@/components/custom/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { routes } from "@/config/routes";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/api/auth.api";
import { toast } from "sonner";

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: AuthApi.fetchLogin,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("ACCESS_TOKEN", data.data.access_token);
      setIsLoading(false);
      toast.success("Login success!");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },
    onError: (error) => {
      toast.error("Login failed!", { description: error.message });
      setIsLoading(false);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    loginMutation.mutate(data, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      {...field}
                      tabIndex={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to={routes.forgotPassword}
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      {...field}
                      tabIndex={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" tabIndex={3} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
