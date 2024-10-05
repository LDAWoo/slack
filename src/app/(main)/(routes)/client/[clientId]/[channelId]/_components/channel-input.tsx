"use client";
import { RootState } from "@/lib/shared/store";
import axios from "axios";
import qs from "query-string";
import Quill from "quill";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Editor from "@/components/ui/editor";

interface ChannelInputProps {
    apiUrl: string;
    query: Record<string, string>;
    type: "conversation" | "channel";
}

const ChannelInput = ({ apiUrl, query }: ChannelInputProps) => {
    const editorRef = useRef<Quill | null>(null);
    const router = useRouter();
    const [editorKey, setEditorKey] = useState(0);
    const { channel } = useSelector((state: RootState) => state.channel);
    const [isLoading, setIsLoading] = useState(false);

    if (!channel) {
        return null;
    }

    const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, {
                content: body,
                file: image,
            });
            setIsLoading(false);
            setEditorKey((prev) => prev + 1);
            router.refresh();
        } catch {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-h-[calc(100%_-_36px)]">
            <div className="p-[0_20px] flex flex-col">
                <div className="flex-[1]">
                    <Editor key={editorKey} defaultValue={[]} placeHolder={`Send a message #${channel.name}`} onSubmit={handleSubmit} disable={isLoading} innerRef={editorRef} />
                </div>

                <div className="flex items-center p-[0_8px_0_12px]">
                    <div className="ml-auto p-2 text-[10px] text-muted-foreground flex justify-end">
                        <p>
                            <strong>Shift + Return</strong> to add a new line
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelInput;
