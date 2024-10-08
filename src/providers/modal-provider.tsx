"use client";

import ChannelModal from "@/components/modals/channel-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";
import StatusUserModal from "@/components/modals/status-user-modal";
import { Channel, ChannelType, Member, Message, User, Workspace } from "@prisma/client";
import React, { createContext, useState, ReactNode } from "react";

export type ModalType = "channelModal" | "deleteMessage" | "statusUser";

interface ModalData {
    workspace?: Workspace;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
    member?: Member & {
        user: User;
    };
    message?: Message;
}

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
    const [data, setData] = useState<ModalData>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = (type: ModalType, data?: ModalData) => {
        setType(type);
        setData(data || {});
        setIsOpen(true);
    };

    const onClose = () => {
        setType(null);
        setData({});
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ type, data, isOpen, onOpen, onClose }}>
            {children}
            <DeleteMessageModal />
            <ChannelModal />
            <StatusUserModal />
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
