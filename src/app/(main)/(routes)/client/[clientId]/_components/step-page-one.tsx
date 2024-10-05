"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/shared/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1).max(50),
    imageUrl: z.string(),
});

const StepPageOne = () => {
    const router = useRouter();
    const { workspace } = useSelector((state: RootState) => state.workspace);
    const { user } = useSelector((state: RootState) => state.user);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: process.env.NEXT_PUBLIC_NEXT_AUTH_URL + "/assets/default_image.png",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const member = workspace?.members.find((member) => member.userId === user?.id);
            const url = qs.stringifyUrl({
                url: `/api/members/${member?.id}`,
                query: {
                    workspaceId: workspace?.id,
                },
            });

            await axios.patch(url, values);
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col p-[64px] max-w-[705px]">
            <span className="text-[13px] text-muted-foreground">Step 1 of 5</span>
            <h1 className="font-bold text-4xl mt-1">What is your name?</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[13px] font-medium">Adding your name adn a profile photo helps your team recognize you more easily.</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} autoComplete="off" className="border-2 rounded-md p-3 w-full" {...field} />
                                </FormControl>
                                <FormMessage className="italic text-[13px]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="imageUrl"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-2">
                                    <FormLabel className="text-[13px] font-semibold">
                                        Your profile picture <span className="text-muted-foreground">(optional)</span>
                                    </FormLabel>
                                    <FormLabel className="text-[13px] font-medium">Help your colleagues ensure they are connecting with the right person.</FormLabel>
                                </div>
                                <FormControl>
                                    <div className="w-[128px] h-[128px] overflow-hidden relative rounded-[10px]">
                                        <Image src={"/assets/default_image.png"} fill alt="avatar" className="object-cover" />
                                        <input {...field} className="hidden" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={isLoading} variant={"primary"} className="rounded-[10px] text-[13px] h-auto p-[.5rem_1.25rem]">
                        Following
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StepPageOne;
