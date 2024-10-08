import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { Pipeline } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
