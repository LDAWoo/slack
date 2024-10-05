import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { db } from "./db";
import { nanoid } from "nanoid";

export const initialUser = async () => {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return redirect("/authentication");
    }

    let user = await db.user.findUnique({
        where: {
            userId: userSession.user?.id,
        },
    });

    const existedUser = await db.user.findUnique({
        where: {
            email: userSession.user?.email as string,
        },
    });

    if (!user) {
        try {
            if (!existedUser) {
                user = await db.user.create({
                    data: {
                        id: nanoid(11),
                        userId: userSession.user?.id,
                        username: userSession.user?.name as string,
                        email: userSession.user?.email as string,
                        imageUrl: userSession.user?.image,
                    },
                });
            } else {
                user = await db.user.update({
                    where: {
                        id: existedUser.id,
                    },
                    data: {
                        userId: userSession.user?.id,
                        username: userSession.user?.name as string,
                        imageUrl: userSession.user?.image,
                    },
                });
            }
        } catch {
            user = await db.user.findUnique({
                where: {
                    userId: userSession.user?.id,
                },
            });
        }
    }

    if (!user) {
        throw new Error("Failed to create or retrieve user");
    }

    return user;
};
