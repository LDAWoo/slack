import { NextApiRequest } from "next";
import { db } from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextApiResponseServerIo } from "./types";

export const currentUserPages = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
    const data = await getServerSession(req, res, authOptions);

    const { id } = data?.user;

    if (!id) return null;

    const user = await db.user.findUnique({
        where: {
            userId: id,
        },
    });

    return user;
};
