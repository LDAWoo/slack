"use client";
import { useModal } from "@/providers/modal-provider";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import qs from "query-string";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const CanvasModal = () => {
    const router = useRouter();
    const params = useParams();
    const { clientId, channelId } = params || {};
    const { isOpen, type, data, onClose } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const isModalOpen = isOpen && data && type === "canvasModal";

    const handleNewCanvas = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: "/api/socket/canvas",
                query: {
                    workspaceId: clientId,
                    channelId,
                },
            });

            await axios.patch(url);
            setIsLoading(false);
            handleClose();
            router.refresh();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-[650px] gap-0 bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[6px]">
                <DialogHeader className="p-[20px_28px]">
                    <DialogTitle className="text-[22px] text-left font-extrabold mr-[32px]">{`Add a canvas`}</DialogTitle>
                </DialogHeader>
                <div className="p-[10px_16px] border-t border-border">
                    <div className="flex items-center relative focus-within:!shadow-focus-border h-[38px] rounded-[8px] focus-within:!rounded-[8x] overflow-hidden w-full focus-within:!border-transparent border border-border">
                        <div className="w-[42px] h-full flex items-center justify-center text-foreground/80">
                            <SearchIcon size={20} />
                        </div>
                        <input type="text" autoComplete="off" className="focus:outline-none focus:border-none w-full h-full border-none p-[9px_0] text-[14px] leading-[22px] placeholder:text-[#8D8D8D]" placeholder="Search for canvas" />
                    </div>
                </div>

                <div className="min-h-[400px] p-0"></div>

                <div className="p-[24px_28px] border-t border-border">
                    <div className="flex items-center justify-between">
                        <Button disabled={isLoading} onClick={handleNewCanvas} className="p-[0_10px] h-[36px] rounded-[8px] text-[15px] border-foreground/65" variant={"outline"}>
                            Create a new canvas
                        </Button>

                        <Button disabled={isLoading} onClick={handleClose} className="ml-auto mr-3 p-[0_10px] h-[36px] rounded-[8px] text-[15px] border-foreground/65" variant={"outline"}>
                            Cancel
                        </Button>

                        <Button disabled={isLoading} className="p-[0_10px] h-[36px] rounded-[8px] text-[15px] border-foreground/65" variant={"success"}>
                            Insert
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CanvasModal;
