import { currentUser } from "@/lib/current-user";
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

    return <ClientPage clientId={params.clientId} user={user} />;
};

export default ClientId;
