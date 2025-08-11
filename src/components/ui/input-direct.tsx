"use client";
import { Send, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface InputDirectProps {
    onChange: (direct: string[]) => void;
    directs?: string[];
}

const InputDirect: React.FC<InputDirectProps> = ({ onChange, directs = [] }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>("");
    const [invalid, setInvalid] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const emailRegex = /\S+@\S+\.\S+/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setInvalid(!emailRegex.test(value));
    };

    const handleInvite = () => {
        if (email && !invalid && !directs.includes(email)) {
            onChange([...directs, email]);
            setEmail("");
            inputRef.current?.focus();
        }
    };

    const handleRemove = (emailToRemove: string) => {
        onChange(directs.filter((direct) => direct !== emailToRemove));
    };

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (email.length > 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [email]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open]);

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <div onClick={handleFocus} className="border rounded-md relative p-[8px_12px_8px_12px] min-h-[122px] max-h-[400px] duration-150 overflow-y-scroll focus:outline-none focus-within:shadow-focus-border focus:rounded-[8px] cursor-text">
                    <div className="relative inline-block flex-wrap items-center w-full">
                        {directs.map((email) => (
                            <EmailComponent key={email} email={email} onRemove={handleRemove} />
                        ))}
                        <input ref={inputRef} value={email} onChange={handleChange} className="m-[0_4px] w-full h-full focus:outline-none" />
                        {email.length === 0 && directs.length === 0 && <div className="absolute top-0 left-0 text-[15px] text-muted-foreground m-[0_4px]">Ex. ellis@gmail.com, maria@gmail.com</div>}
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-full min-w-[599px] p-[12px_0]">
                {invalid ? (
                    <div className="w-full p-[0_24px]">
                        <span className="text-[15px]">Enter a valid email address</span>
                    </div>
                ) : (
                    email && (
                        <div onClick={handleInvite} className="bg-[#1264a3] hover:opacity-80 transition-all duration-300 inline-flex items-center text-white w-full p-[0_24px] h-[32px] cursor-pointer">
                            <Send size={16} className="mr-2" />
                            <span className="font-medium text-[15px] mr-2">Invite</span>
                            <span className="text-sm">{email}</span>
                        </div>
                    )
                )}
            </PopoverContent>
        </Popover>
    );
};

export default React.memo(InputDirect);

const EmailComponent = React.memo(({ email, onRemove }: { email: string; onRemove: (email: string) => void }) => (
    <span className="m-[4px_0_0_4px] cursor-pointer min-h-[26px] rounded-[4px] inline-flex items-center pr-1 whitespace-nowrap bg-[#1d9bd11a]">
        <span className="p-[0_4px] inline-flex items-center">
            <Send size={16} className="mr-1" />
            <span className="text-[15px] font-semibold">{email}</span>
        </span>
        <div className="h-5 w-5 flex items-center justify-center hover:bg-primary-foreground" onClick={() => onRemove(email)}>
            <X size={16} />
        </div>
    </span>
));

EmailComponent.displayName = "Email";
