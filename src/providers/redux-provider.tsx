"use client";
import { store } from "@/lib/shared/store";
import React from "react";
import { Provider } from "react-redux";
export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
