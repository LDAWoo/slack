import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientPage from "./_components/client-page";

interface IClientId {
    params: {
        clientId: string;
    };
}

const ClientId = async ({ params }: IClientId) => {
    const user = await currentUser();

    if (!user) return redirect("/authentication");

    const workspace = await db.workspace.findFirst({
        where: {
            id: params.clientId,
            members: {
                some: {
                    userId: user.id,
                },
            },
        },
        include: {
            channels: true,
            members: true,
        },
    });

    const conversations = await db.conversation.findMany({
        where: {
            memberOneEmail: user.email,
        },
    });

    return <ClientPage workspace={workspace} user={user} conversations={conversations} />;
};

export default ClientId;
