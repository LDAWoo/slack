import { Canvas, Channel, Member, Message, Pin, Reaction, Section, User, Workspace } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
export type SignInFlow = "signIn" | "signUp";

export type WorkspaceWithChannelAndMemberAndCanvas = {
    workspace?:
        | (Workspace & {
              members: MemberWithUser[];
              channels: Channel[];
              canvas: Canvas[];
          })
        | null;
};

export type CanvasWithSection = {
    canvas:
        | (Canvas & {
              sections: Section[];
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
    pin: PinWithMemberWithUser;
    reactions: ReactionWithMemberWithUser[];
};

export type MessageWithPinWithReaction = {
    message?:
        | (Message & {
              pin: Pin;
              reactions: Reaction[];
          })
        | null;
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
