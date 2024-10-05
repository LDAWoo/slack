"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <SessionProvider>
            <main className="h-screen bg-background">{children}</main>
        </SessionProvider>
    );
};

export default Layout;
