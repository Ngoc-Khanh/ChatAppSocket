import { PasswordInput } from "@/components/custom/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required!" }),
    email: z
      .string()
      .min(1, { message: "Please enter your email" })
      .email({ message: "Invalid email address!" }),
    password: z
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  className,
  ...props
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Dev" {...field} tabIndex={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      tabIndex={2}
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
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      {...field}
                      tabIndex={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password Confirmation</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      {...field}
                      tabIndex={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <Button className="mt-2" disabled>
                <Loader2 className="animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button className="mt-2" tabIndex={5}>
                Register
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
