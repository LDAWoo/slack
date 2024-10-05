"use client";
import { AiSparkleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/lib/shared/store";
import axios from "axios";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useSelector } from "react-redux";

const StepPageFive = () => {
    const router = useRouter();
    const { workspace } = useSelector((state: RootState) => state.workspace);

    const handleClickFreePlan = async () => {
        const url = qs.stringifyUrl({
            url: `/api/workspaces/${workspace?.id}`,
        });

        await axios.patch(url, { step: 6, name: workspace?.name });
        router.refresh();
    };

    return (
        <div className="flex flex-col p-[64px]">
            <span className="text-[13px] text-muted-foreground">Step 5 of 5</span>
            <h1 className="font-bold text-[48px] leading-[46px] mt-1">Choose a package to get started:</h1>

            <div className="grid grid-cols-1 max-w-[886px] xl:grid-cols-2 w-full gap-7 mt-7">
                <Card className="min-w-[333px] max-w-[416px] flex flex-col overflow-hidden shadow-[0_4px_10px_#00000026] rounded-[12px] border-none">
                    <CardHeader className="p-[24px_32px]">
                        <CardTitle className="font-bold mb-5 text-[22px]">Free</CardTitle>
                        <div>
                            <CardDescription className="mt-3 text-[36px] font-bold text-foreground">0&nbsp;$&nbsp;US</CardDescription>
                            <CardDescription className="mb-4 text-lg font-bold text-foreground">per person/month</CardDescription>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-[24px_32px]">
                        <div>
                            <p className="text-sm font-medium">Included with the Free plan :</p>
                            <ul className="space-y-[8px] pt-3">
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <Check size={14} />
                                    <span>90 days of message history</span>
                                </li>
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <Check size={14} />
                                    <span>One-on-one audio and video conversations</span>
                                </li>
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <Check size={14} />
                                    <span>10 apps or integrations</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-grow items-end">
                        <Button onClick={handleClickFreePlan} className="w-full rounded-[12px] h-[44px] min-w-[96px] bg-transparent hover:bg-accent overflow-hidden shadow-[0_1px_3px_#00000014] text-foreground text-lg border border-background-slack">
                            Get started with the free plan
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="min-w-[333px] max-w-[416px] overflow-hidden shadow-[0_4px_10px_#00000026] rounded-[12px] border-none">
                    <CardHeader className="p-[24px_32px] bg-[#5B2B5D] text-white">
                        <CardTitle className="font-bold mb-5 text-[22px]">Free</CardTitle>
                        <div>
                            <CardDescription className="mt-3 text-[36px] font-bold text-white">19&nbsp;$&nbsp;US</CardDescription>
                            <CardDescription className="mb-4 text-lg font-bold text-white">per person/month</CardDescription>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-[24px_32px]">
                        <div>
                            <p className="text-sm font-medium">Key messages of the Pro package ::</p>
                            <ul className="space-y-[8px] pt-3">
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <AiSparkleIcon size={14} />
                                    <span className="border-b border-dashed border-[#7c7a7f] text-[#1264a3] font-medium">It is now possible to add Slack AI</span>
                                </li>
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <Check size={14} />
                                    <span>Unlimited message archiving</span>
                                </li>
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <Check size={14} />
                                    <span>Unlimited audio and video conversations</span>
                                </li>
                                <li className="flex items-center gap-4 text-[15px] text-accent-foreground/80">
                                    <Check size={14} />
                                    <span>Unlimited Apps & Integrations</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full rounded-[12px] h-[44px] min-w-[96px] bg-[#007a5a] hover:bg-[#007a5a]/90 hover:shadow-[0_1px_4px_#0000004d] overflow-hidden shadow-[0_1px_3px_#00000014] text-white text-lg">Start with the Pro package</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default StepPageFive;
