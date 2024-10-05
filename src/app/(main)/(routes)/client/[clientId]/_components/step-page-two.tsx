"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/shared/store";
import { updateWorkspace } from "@/lib/shared/workspaces/workspace-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1).max(50),
});

const StepPageTwo = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { workspace } = useSelector((state: RootState) => state.workspace);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/workspaces/${workspace?.id}`,
            });

            await axios.patch(url, { ...values, step: 3 });
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const subscription = form.watch((value) => {
            const name = value.name;
            dispatch(
                updateWorkspace({
                    name,
                })
            );
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="flex flex-col p-[64px] max-w-[705px]">
            <span className="text-[13px] text-muted-foreground">Step 2 of 5</span>
            <h1 className="font-bold text-4xl mt-1">What is the name of your company or team?</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[13px] font-medium">This will be the name of your Slack workspace. Choose something recognizable to your team.</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Ex. :Fictions SA Marketing ou Fictions SA Co" autoComplete="off" className="border-2 rounded-md p-3 w-full" {...field} />
                                </FormControl>
                                <FormMessage className="italic text-[13px]" />
                            </FormItem>
                        )}
                    />

                    <Button disabled={form.getValues("name").length === 0 || isLoading} variant={"primary"} className="rounded-[10px] text-[13px] h-auto p-[.5rem_1.25rem] disabled:opacity-100 disabled:bg-zinc-200 disabled:text-accent-foreground/90">
                        Following
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StepPageTwo;
