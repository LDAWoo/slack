"use client";
import axios from "axios";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import qs from "query-string";
import { useState } from "react";
import UserAvatar from "../global/user-avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/providers/modal-provider";
import { formatMessageDate } from "@/lib/date";
import Renderer from "../global/renderer";
const DeleteMessageModal = () => {
    const { isOpen, type, data, onClose } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const { apiUrl, query, member, message } = data;
    const isModalOpen = isOpen && data && type === "deleteMessage";

    const fileType = message?.fileUrl?.split(".").pop();
    const isPDF = fileType === "pdf" && message?.fileUrl;
    const isImage = !isPDF && message?.fileUrl;

    const onDelete = async () => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            setIsLoading(true);
            await axios.delete(url);
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="w-[520px] bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[6px]">
                <DialogHeader className="p-[16px_24px]">
                    <DialogTitle className="text-2xl text-left font-extrabold mr-[32px]">{`Delete message`}</DialogTitle>
                    <DialogDescription className="text-left text-foreground/80 text-[15px]">Do you really want to delete this message? This operation is irreversible.</DialogDescription>
                </DialogHeader>

                <div className="px-6">
                    <div className="border border-foreground/30 px-4 bg-background rounded-[4px] py-[10px] flex">
                        <UserAvatar src={member?.user?.imageUrl as string} className="h-6 w-6 rounded-md" />
                        <div className="flex flex-col ml-2 w-full -translate-y-[1px]">
                            <div className="flex flex-col">
                                <div className="inline-block">
                                    <span className="mr-1 text-[15px] font-extrabold">{member?.user?.username}</span>
                                    <span className="text-muted-foreground text-xs">{formatMessageDate(new Date(message?.createdAt || new Date()))}</span>
                                </div>
                            </div>

                            {!message?.fileUrl && message && <Renderer body={message.content} />}

                            {isPDF && (
                                <div className="max-w-full w-full p-4 mt-2 rounded-[8px] border border-primary-foreground/90 bg-popover/10">
                                    <div className="relative flex items-center">
                                        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                                        <a href={message?.fileUrl || ""} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                                            PDF File
                                        </a>
                                    </div>
                                </div>
                            )}

                            {isImage && (
                                <a href={message?.fileUrl || ""} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-[8px] mt-1 overflow-hidden border flex items-center bg-secondary h-48 w-full">
                                    <Image fill src={message?.fileUrl || ""} alt={message.content} className="object-cover" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-[16px_24px] mt-2">
                    <div className="flex h-full items-end">
                        <Button disabled={isLoading} className="text-[15px] h-9 ml-auto rounded-[6px] font-bold focus-visible:ring-0 focus-visible:ring-offset-0" variant={"outline"} onClick={onClose}>
                            No
                        </Button>
                        <Button disabled={isLoading} className="text-[15px] h-9 uppercase ml-4 rounded-[6px] font-bold bg-rose-500 hover:bg-rose-600 text-white" onClick={onDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteMessageModal;
