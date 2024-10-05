"use client";
import { SignInForm } from "@/components/form/sign-in-form";
import { SignUpForm } from "@/components/form/sign-up-form";
import { SignInFlow } from "@/lib/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
    const { data, status } = useSession();
    const [state, setState] = React.useState<SignInFlow>("signIn");

    if (status === "loading") {
        return null;
    }

    if (data) {
        return redirect("/");
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="md:h-auto md:w-[420px] ">
                {state === "signIn" && <SignInForm setState={setState} />}
                {state === "signUp" && <SignUpForm setState={setState} />}
            </div>
        </div>
    );
};

export default Page;
