"use server";
import { db } from "@/lib/db";
import { initialUser } from "@/lib/initialUser";
import { redirect } from "next/navigation";
import React from "react";
import Header from "./_components/header";

const Page = async () => {
    const user = await initialUser();

    const workspace = await db.workspace.findFirst({
        where: {
            members: {
                some: {
                    userId: user.id,
                },
            },
        },
    });

    if (workspace) {
        return redirect(`/client/${workspace.id}`);
    }

    return (
        <div>
            <Header />
        </div>
    );
};

export default Page;
