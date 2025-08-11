"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateWorkspaceMutation } from "@/lib/shared/workspace/workspace-api";
import { WorkspaceWithChannelAndMemberAndCanvas } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

type StepPageThreeProps = WorkspaceWithChannelAndMemberAndCanvas;

const StepPageThree = ({ workspace }: StepPageThreeProps) => {
  const router = useRouter();
  const maxNameLength = 50;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [updateWorkspace] = useUpdateWorkspaceMutation();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateWorkspace({
        url: `/channels?workspaceId=${workspace?.id}`,
        ...values,
        step: 4,
      });

      router.refresh();
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-[64px] max-w-[705px]">
      <span className="text-[13px] text-muted-foreground">Step 3 of 5</span>
      <h1 className="!font-bold !text-[48px] mt-1 !leading-[46px]">
        What is your team working oon right now?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px] font-medium">
                  THis choice is yours: it could be a project a campaign, an
                  event or a contract that you are looking to sign.
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      disabled={isLoading}
                      placeholder="Example: Quarter 4 budget, fall campaign"
                      autoComplete="off"
                      className={cn(
                        "border transition-all h-9 border-foreground/70 focus-within:!border-foreground/0 focus:outline-none rounded-[8px] p-[3px_40px_5px_12px] w-full focus-within:!shadow-focus-border overflow-visible",
                        {
                          "border-destructive focus-within:!border-destructive/0 focus-within:!shadow-focus-border-error":
                            field.value.length >= maxNameLength,
                        }
                      )}
                      {...field}
                    />
                    <span className="w-9 h-9 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 text-[13px] text-muted-foreground">
                      {maxNameLength - field.value.length}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="italic text-[13px]" />
              </FormItem>
            )}
          />

          <Button
            disabled={form.getValues("name").length === 0 || isLoading}
            variant={"primary"}
            className="rounded-[10px] text-[13px] h-auto p-[.5rem_1.25rem] disabled:opacity-100 disabled:bg-zinc-200 disabled:text-accent-foreground/90"
          >
            Following
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StepPageThree;
