"use client";

import CanvasModal from "@/components/modals/canvas-modal";
import ChannelModal from "@/components/modals/channel-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";
import StatusUserModal from "@/components/modals/status-user-modal";
import { WorkspaceWithChannelAndMemberAndCanvas } from "@/lib/types";
import { Channel, ChannelType, Member, Message, User } from "@prisma/client";
import React, { createContext, ReactNode, useState } from "react";

export type ModalType = "channelModal" | "deleteMessage" | "statusUser" | "canvasModal" | "canvasToolbar";

export type DefaultType = "members";

type ModalData = WorkspaceWithChannelAndMemberAndCanvas & {
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
    member?: Member & {
        user: User;
    };
    user?: User;
    message?: Message;
    defaultType?: DefaultType;
};

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

const ModalContext = createContext<ModalStore | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [type, setType] = useState<ModalType | null>(null);
    const [data, setData] = useState<ModalData | {}>({
        //@typescript-eslint/no-empty-object-type
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = (type: ModalType, data?: ModalData) => {
        setType(type);
        if (data) {
            setData(data);
        }
        setIsOpen(true);
    };

    const onClose = () => {
        setType(null);
        setData({
            //@typescript-eslint/no-empty-object-type
        });
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ type, data, isOpen, onOpen, onClose }}>
            {children}
            <DeleteMessageModal />
            <ChannelModal />
            <StatusUserModal />
            <CanvasModal />
        </ModalContext.Provider>
    );
};

export default ModalContext;

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
