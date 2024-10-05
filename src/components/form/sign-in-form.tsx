import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

interface SignInFormProps {
    setState: (state: SignInFlow) => void;
}

export const SignInForm = ({ setState }: SignInFormProps) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = () => {};

    const handleAuthGoogle = () => {
        signIn("google");
    };

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>Use your email or another service to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input required type="email" disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input required type="password" disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" size={"lg"} disabled={isLoading}>
                            Continue
                        </Button>
                    </form>
                    <Separator />
                    <div className="flex flex-col gap-y-2.5">
                        <Button onClick={() => handleAuthGoogle()} variant={"outline"} className="w-full relative" size={"lg"}>
                            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                            Continue with Google
                        </Button>
                        <Button variant={"outline"} className="w-full relative" size={"lg"}>
                            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                            Continue with Github
                        </Button>
                        <p className="text-xs text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => setState("signIn")}>
                                Sign up
                            </span>
                        </p>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
};
