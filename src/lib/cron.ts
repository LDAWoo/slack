import cron from "node-cron";
import { db } from "@/lib/db";

cron.schedule("0 * * * *", async () => {
    try {
        const now = new Date();
        const expiredMembers = await db.member.findMany({
            where: {
                user: {
                    statusExpiration: {
                        lte: now,
                    },
                },
            },
            include: {
                user: true,
            },
        });

        for (const member of expiredMembers) {
            await db.member.update({
                where: {
                    id: member.id,
                },
                data: {
                    user: {
                        update: {
                            statusText: "",
                            statusEmoji: "",
                            statusExpiration: null,
                        },
                    },
                },
            });
        }
        console.log(`Cron job executed successfully`);
    } catch (error) {
        console.error("Error running cron job", error);
    }
});
