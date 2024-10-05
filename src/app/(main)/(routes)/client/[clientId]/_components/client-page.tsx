"use client";

import { setUser } from "@/lib/shared/user/user-slice";
import { setWorkspace } from "@/lib/shared/workspaces/workspace-slice";
import { WorkspaceWithChannelAndMember } from "@/lib/types";
import { Conversation, User } from "@prisma/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import StepPageOne from "./step-page-one";
import StepPageTwo from "./step-page-two";
import StepPageThree from "./step-page-three";
import StepPageFour from "./step-page-four";
import StepPageFive from "./step-page-five";
import { setConversations } from "@/lib/shared/conversations/conversations-slice";
import { redirect } from "next/navigation";

type ClientPageProps = WorkspaceWithChannelAndMember & {
    user: User;
    conversations: Conversation[] | null;
};

const ClientPage: React.FC<ClientPageProps> = ({ user, workspace, conversations }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
        if (workspace) {
            dispatch(setWorkspace(workspace));
        }
        if (conversations) {
            dispatch(setConversations(conversations));
        }
    }, [workspace, user, conversations, dispatch]);

    if (!workspace) {
        return redirect("/");
    }

    const channel = workspace.channels[2]; // channel name is current create channel

    const step = workspace?.step;

    switch (step) {
        case 1:
            return <StepPageOne />;
        case 2:
            return <StepPageTwo />;
        case 3:
            return <StepPageThree />;
        case 4:
            return <StepPageFour />;
        case 5:
            return <StepPageFive />;
        case 6:
            return redirect(`/client/${workspace?.id}/${channel.id}`);
        default:
            return redirect("/");
    }
};

export default ClientPage;
