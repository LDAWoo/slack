import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
