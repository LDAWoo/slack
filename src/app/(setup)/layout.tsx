"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <SessionProvider>
            <div className="h-screen w-screen bg-background-slack">{children}</div>
        </SessionProvider>
    );
};

export default Layout;
