"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/lib/shared/store";
import { QueryProvider } from "@/providers/query-provider";
import { SocketProvider } from "@/providers/socket-provider";
import React from "react";
import { Provider } from "react-redux";
import SplitPane from "react-split-pane";
import Content from "./client/_components/content";
import Header from "./client/_components/header";
import Sidebar from "./client/_components/sidebar";
import { ModalProvider } from "@/providers/modal-provider";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    const initialWidthPanel1 = 266;
    const initialWidthPanel2 = 365;

    const getStylesPanel1 = () => {
        return { minWidth: "180px", maxWidth: `calc(100% - ${initialWidthPanel2}px)` };
    };

    const getStylesPanel2 = () => {
        return {};
    };
    return (
        <Provider store={store}>
            <SocketProvider>
                <QueryProvider>
                    <TooltipProvider>
                        <ModalProvider>
                            <div className="h-screen w-full overflow-hidden bg-background-slack" aria-label="workspace">
                                <div className="grid grid-rows-[40px_1fr] h-screen">
                                    <Header />
                                    <div className="grid grid-cols-[70px_1fr] h-full w-full">
                                        <Sidebar />
                                        <div className="relative">
                                            <SplitPane defaultSize={initialWidthPanel1} resizerClassName="relative grid w-[2px] after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:w-[8px] after:cursor-col-resize after:hover:bg-[#1d9bff] after:hover:shadow-[0_0_0_1px_#1d9bff] h-full" pane1Style={getStylesPanel1()} pane2Style={getStylesPanel2()}>
                                                <div className="w-full h-full">
                                                    <Content />
                                                </div>
                                                <div className="w-full h-full">
                                                    <main className="w-full h-full max-h-[calc(100vh_-_40px)] bg-background overflow-auto">{children}</main>
                                                </div>
                                            </SplitPane>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalProvider>
                    </TooltipProvider>
                </QueryProvider>
            </SocketProvider>
        </Provider>
    );
};

export default Layout;
