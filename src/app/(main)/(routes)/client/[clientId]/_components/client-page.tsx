"use client";

import React from "react";
import { useGetWorkspaceQuery } from "@/lib/shared/workspace/workspace-api";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const StepPageOne = dynamic(() => import("./step-page-one"));
const StepPageTwo = dynamic(() => import("./step-page-two"));
const StepPageThree = dynamic(() => import("./step-page-three"));
const StepPageFour = dynamic(() => import("./step-page-four"));
const StepPageFive = dynamic(() => import("./step-page-five"));

type ClientPageProps = {
  clientId: string;
  user: User;
};

const ClientPage: React.FC<ClientPageProps> = React.memo(
  ({ clientId, user }) => {
    const { data, isLoading } = useGetWorkspaceQuery(clientId, {
      refetchOnMountOrArgChange: false,
    });

    if (isLoading) {
      return <div />;
    }

    const workspace = data?.workspace;

    if (!workspace) {
      return redirect("/");
    }

    const channel = workspace.channels[2];
    const step = workspace?.step;

    switch (step) {
      case 1:
        return <StepPageOne workspace={workspace} user={user} />;
      case 2:
        return <StepPageTwo workspace={workspace} />;
      case 3:
        return <StepPageThree workspace={workspace} />;
      case 4:
        return <StepPageFour workspace={workspace} />;
      case 5:
        return <StepPageFive workspace={workspace} />;
      case 6:
        return redirect(`/client/${workspace?.id}/${channel.id}`);
      default:
        return redirect("/");
    }
  }
);
ClientPage.displayName = "Client Page";

export default ClientPage;
