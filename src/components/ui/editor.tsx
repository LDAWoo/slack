"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, ImageIcon, SendHorizonal, XIcon } from "lucide-react";
import Image from "next/image";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { memo, MutableRefObject, useEffect, useRef, useState } from "react";
import EmojiPicker from "../global/emoji-picker";
import { AaIcon } from "../icons";
import { Button } from "./button";
import Hint from "./hint";
import { Delta, Op } from "quill/core";

type EditorValue = {
    body: string;
    image: File | null;
};

interface EditorProps {
    variant?: "create" | "update";
    defaultValue?: Delta | Op[];
    onSubmit: (value: EditorValue) => void;
    onCancel?: () => void;
    placeHolder?: string;
    disable?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
}

const Editor = ({ variant = "create", defaultValue = [], onCancel, onSubmit, placeHolder = "Write something...", disable = false, innerRef }: EditorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const quillRef = useRef<Quill | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const [isToolbar, setIsToolbar] = useState(false);
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const editorComponent = container.appendChild(container.ownerDocument.createElement("div"));

        const options: QuillOptions = {
            theme: "snow",
            placeholder: placeHolder,
            modules: {
                toolbar: [
                    ["bold", "italic", "strike"],
                    ["link"],
                    [
                        {
                            list: "ordered",
                        },
                        {
                            list: "bullet",
                        },
                    ],
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: function () {
                                const text = quill.getText();
                                const addedImage = imageRef.current?.files?.[0] || null;
                                const isEmpty = !addedImage && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

                                if (isEmpty) {
                                    return;
                                }
                                const body = JSON.stringify(quill.getContents());

                                onSubmit({
                                    body,
                                    image,
                                });
                            },
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: function () {
                                quill.insertText(quill.getSelection()?.index || 0, "\n");
                            },
                        },
                    },
                },
            },
        };

        const quill = new Quill(editorComponent, options);
        quillRef.current = quill;
        quillRef.current.focus();

        if (innerRef) {
            innerRef.current = quill;
        }

        quill.setContents(defaultValue);

        const lastPosition = quill.getLength();
        quill.setSelection(lastPosition, lastPosition);

        setContent(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setContent(quill.getText());
        });

        quillRef.current.focus();

        return () => {
            quill.off(Quill.events.TEXT_CHANGE);
            if (container) {
                container.innerHTML = "";
            }

            if (quillRef.current) {
                quillRef.current = null;
            }

            if (innerRef?.current) {
                innerRef.current = null;
            }
        };
    }, [innerRef, placeHolder, defaultValue]);

    const isEmpty = content.replace(/<(.|\n)*?>/g, "").trim().length === 0;

    const toggleToolbar = () => {
        setIsToolbar((prev) => !prev);
        const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
        if (toolbarElement) {
            toolbarElement.classList.toggle("hidden");
        }
    };

    const onEmojiSelect = (emoji: any) => {
        const quill = quillRef.current;
        const url = `https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/${emoji.unified}.png`;
        if (quill) {
            quill.focus();

            const selection = quill.getSelection();
            const index = selection ? selection.index : 0;

            console.log("Current selection index:", index);

            quill.insertEmbed(index, "image", url);

            quill.setSelection(index + 1);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-background">
                <div ref={containerRef} className="h-full ql-custom" />
                {image && (
                    <div className="p-[8px_12px]">
                        <div className="relative size-[62px] flex items-center justify-center group/image">
                            <Hint content={"Remove image"}>
                                <button
                                    onClick={() => {
                                        setImage(null);
                                        imageRef.current!.value = "";
                                    }}
                                    className="hidden group-hover/image:flex rounded-full bg-foreground/70 hover:bg-foreground absolute -top-2.5 -right-2.5 text-background size-6 z-[4] border-2 border-background items-center justify-center"
                                >
                                    <XIcon className="size-3.5" />
                                </button>
                            </Hint>
                            <Image src={URL.createObjectURL(image) || "/assets/default_image.png"} fill alt="Uploaded" className="rounded-xl overflow-hidden border object-cover" />
                        </div>
                    </div>
                )}
                <div className="flex p-[0_4px_0_6px] items-center justify-between">
                    <div className="flex-[1] flex items-center p-1 gap-1">
                        <Hint content={isToolbar ? "Hide formatting options" : "Show formatting options"}>
                            <div className="flex items-center h-[28px] w-[28px]">
                                <div>
                                    <Button onClick={toggleToolbar} variant={"ghost"} className={cn("relative p-0 text-muted-foreground h-[28px] w-[28px] rounded-[4px]")}>
                                        <AaIcon size={18} />
                                        <span
                                            className={cn({
                                                "after:absolute after:bottom-1 after:left-[50%] after:-translate-x-[50%] after:h-[1.5px] after:w-[75%] after:bg-foreground/80": !isToolbar,
                                            })}
                                        />
                                    </Button>
                                </div>
                            </div>
                        </Hint>

                        <Hint content="Emojis">
                            <div className="flex items-center h-[28px] w-[28px]">
                                <EmojiPicker onChange={onEmojiSelect} />
                            </div>
                        </Hint>

                        <Hint content={"Image"}>
                            <div className="flex items-center h-[28px] w-[28px]">
                                <div>
                                    <Button onClick={() => imageRef.current?.click()} variant={"ghost"} className={cn("relative p-0 text-muted-foreground h-[28px] w-[28px] rounded-[4px]")}>
                                        <ImageIcon size={18} />
                                    </Button>
                                    <input type="file" accept="image/*" ref={imageRef} onChange={(e) => setImage(e.target.files![0])} className="hidden" />
                                </div>
                            </div>
                        </Hint>
                    </div>

                    <div className="flex flex-shrink-0 items-end p-1 pr-[2px]">
                        {variant === "create" && (
                            <span className="inline-flex rounded-[4px] overflow-hidden ml-0 relative">
                                <Hint content={"Send now"}>
                                    <Button
                                        disabled={isEmpty || disable}
                                        className={cn("w-[32px] h-[28px] p-[0_8px] rounded-none transition-all duration-300 bg-[#007a5a] hover:bg-[#148567]", {
                                            "bg-transparent text-foreground cursor-default": isEmpty,
                                        })}
                                        onClick={() => {
                                            onSubmit({
                                                body: JSON.stringify(quillRef.current?.getContents()),
                                                image,
                                            });
                                        }}
                                    >
                                        <SendHorizonal size={16} />
                                    </Button>
                                </Hint>
                                <span
                                    className={cn("absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[1px] bg-background/50 h-[calc(100%_-_8px)]", {
                                        "bg-foreground/30": isEmpty,
                                    })}
                                />

                                <Hint content={"Schedule for later"} side="left">
                                    <Button
                                        disabled={isEmpty || disable}
                                        className={cn("w-[32px] h-[28px] p-[0_8px] rounded-none transition-all duration-300 bg-[#007a5a] hover:bg-[#148567]", {
                                            "bg-transparent text-foreground cursor-default": isEmpty,
                                        })}
                                    >
                                        <ChevronDown size={16} />
                                    </Button>
                                </Hint>
                            </span>
                        )}

                        {variant === "update" && (
                            <span className="flex gap-2 items-center">
                                <Button onClick={onCancel} variant={"outline"} className="text-[13px] h-[28px] rounded-[6px] p-[0_8px] transition-all duration-300">
                                    Cancel
                                </Button>

                                <Button onClick={onCancel} className={cn("text-[13px] h-[28px] rounded-[6px] p-[0_8px] transition-all duration-300 bg-[#007a5a] hover:bg-[#148567]", {})}>
                                    Save
                                </Button>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Editor);
