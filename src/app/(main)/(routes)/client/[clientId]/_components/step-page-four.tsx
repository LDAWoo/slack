"use client";
import { Button } from "@/components/ui/button";
import InputDirect from "@/components/ui/input-direct";
import { RootState } from "@/lib/shared/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { useSelector } from "react-redux";

const StepPageFour = () => {
    const router = useRouter();
    const { workspace } = useSelector((state: RootState) => state.workspace);
    const [directs, setDirects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInviteColleagues = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/conversations`,
                query: {
                    workspaceId: workspace?.id,
                },
            });

            await axios.post(url, { emails: directs });
            router.refresh();
            setDirects([]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);

            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (!workspace) {
        return null;
    }

    return (
        <div className="flex flex-col p-[64px] max-w-[705px]">
            <span className="text-[13px] text-muted-foreground">Step 4 of 5</span>
            <h1 className="font-bold text-[48px] leading-[46px] mt-1">
                Who else is on the <span>{workspace?.name}</span> team ?
            </h1>

            <div className="mt-4 space-y-6 w-full">
                <p className="font-semibold text-[13px]">Add colleagues by email</p>

                <div className="space-y-6">
                    <InputDirect directs={directs} onChange={setDirects} />

                    <Button onClick={handleInviteColleagues} disabled={isLoading} variant={"primary"} className="rounded-[10px] text-base h-auto p-[.5rem_1.25rem] disabled:opacity-100 disabled:bg-zinc-200 disabled:text-accent-foreground/90">
                        Following
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepPageFour;
