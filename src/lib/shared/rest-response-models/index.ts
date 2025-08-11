import { WorkspaceWithChannelAndMemberAndCanvas } from "@/lib/types";
import { Channel, Pipeline } from "@prisma/client";

export type WorkspacesListResponseModels = WorkspaceWithChannelAndMemberAndCanvas[];
export type WorkspacesDetailsResponseModels = WorkspaceWithChannelAndMemberAndCanvas;

export type ChannelDetailsResponseModels = {
    channel: Channel & { pipelines: Pipeline[] };
};
