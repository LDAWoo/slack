"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateWorkspaceMutation } from "@/lib/shared/workspace/workspace-api";
import { WorkspaceWithChannelAndMemberAndCanvas } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().max(50),
});

type StepPageTwoProps = WorkspaceWithChannelAndMemberAndCanvas;

const StepPageTwo = ({ workspace }: StepPageTwoProps) => {
    const router = useRouter();
    const maxNameLength = 50;
    const [updateWorkspace] = useUpdateWorkspaceMutation();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateWorkspace({
                url: `/workspaces/${workspace?.id}`,
                ...values,
                step: 3,
            });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col p-[64px] max-w-[705px]">
            <span className="text-[13px] text-muted-foreground">Step 2 of 5</span>
            <h1 className="!font-bold !text-[48px] mt-1 !leading-[46px]">What is the name of your company or team?</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[13px] font-medium">This will be the name of your Slack workspace. Choose something recognizable to your team.</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Ex. :Fictions SA Marketing ou Fictions SA Co"
                                            autoComplete="off"
                                            className={cn("border transition-all h-9 border-foreground/70 focus-within:!border-foreground/0 focus:outline-none rounded-[8px] p-[3px_40px_5px_12px] w-full focus-within:!shadow-focus-border overflow-visible", {
                                                "border-destructive focus-within:!border-destructive/0 focus-within:!shadow-focus-border-error": field.value.length >= maxNameLength,
                                            })}
                                            {...field}
                                        />
                                        <span className="w-9 h-9 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 text-[13px] text-muted-foreground">{maxNameLength - field.value.length}</span>
                                    </div>
                                </FormControl>
                                <FormMessage className="italic text-[13px]" />
                            </FormItem>
                        )}
                    />

                    <Button disabled={form.getValues("name").length === 0 || isLoading} variant={"primary"} className="min-w-[122px] rounded-[8px] text-[15px] h-9 p-[12px_1px] disabled:opacity-100 disabled:bg-zinc-200 disabled:text-accent-foreground/90">
                        Next
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StepPageTwo;
