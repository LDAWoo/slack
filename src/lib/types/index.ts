import { Channel, Member, Message, Pin, Reaction, User, Workspace } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
export type SignInFlow = "signIn" | "signUp";
import { Server as SocketIOServer } from "socket.io";

export type WorkspaceWithChannelAndMember = {
    workspace:
        | (Workspace & {
              members: Member[];
              channels: Channel[];
          })
        | null;
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io?: SocketIOServer;
        };
    };
};

export type MessageWithMemberWithUser = Message & {
    member: Member & {
        user: User;
    };
    pin: Pin;
    reactions: Reaction[];
};

export type PinWithMemberWithUser = Pin & {
    member: Member & {
        user: User;
    };
};

export type ReactionWithMemberWithUser = Reaction & {
    member: Member & {
        user: User;
    };
};

export type MemberWithUser = Member & {
    user: User;
};
