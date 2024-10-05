import { nanoid } from "nanoid";
import { db } from "./db";

export const getOrCreateConversation = async (memberOneEmail: string, memberTwoEmail: string) => {
    let conversation = await findConversation(memberOneEmail, memberTwoEmail);

    if (!conversation) {
        conversation = await createNewConversation(memberOneEmail, memberTwoEmail);
    }

    return conversation;
};

const findConversation = async (memberOneEmail: string, memberTwoEmail: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                OR: [
                    {
                        memberOneEmail: memberOneEmail,
                        memberTwoEmail: memberTwoEmail,
                    },
                    {
                        memberOneEmail: memberTwoEmail,
                        memberTwoEmail: memberOneEmail,
                    },
                ],
            },
            include: {
                memberOne: {
                    include: {
                        user: true,
                    },
                },
                memberTwo: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error finding conversation:", error);
        return null;
    }
};

const createNewConversation = async (memberOneEmail: string, memberTwoEmail: string) => {
    try {
        return await db.conversation.create({
            data: {
                id: nanoid(11),
                memberOneEmail,
                memberTwoEmail,
            },
            include: {
                memberOne: {
                    include: {
                        user: true,
                    },
                },
                memberTwo: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
    }
};
