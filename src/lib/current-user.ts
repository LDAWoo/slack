import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { db } from "./db";

export const currentUser = async () => {
    const data = await getServerSession(authOptions);

    const { id } = data?.user;

    if (!id) return null;

    const user = await db.user.findFirst({
        where: {
            userId: id,
        },
    });

    return user;
};
