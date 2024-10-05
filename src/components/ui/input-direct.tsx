"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Send, X } from "lucide-react";

interface InputDirectProps {
    onChange: (direct: string[]) => void;
    directs?: string[];
}

const InputDirect: React.FC<InputDirectProps> = ({ onChange, directs = [] }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>("");
    const [invalid, setInvalid] = useState<boolean>(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const emailRegex = /\S+@\S+\.\S+/; // More generic email regex
        setEmail(value);
        setInvalid(!emailRegex.test(value));
    };

    const handleInvite = () => {
        if (email && !invalid && !directs.includes(email)) {
            onChange([...directs, email]); // Add new email to the list
            setEmail(""); // Clear input after adding

            // Explicitly refocus the input
            inputRef.current?.focus();
        }
    };

    const handleRemove = (emailToRemove: string) => {
        onChange(directs.filter((direct) => direct !== emailToRemove));
    };

    // Email component
    const EmailComponent = ({ email }: { email: string }) => (
        <span className="m-[4px_0_0_4px] cursor-pointer min-h-[26px] rounded-[4px] inline-flex items-center pr-1 whitespace-nowrap bg-[#1d9bd11a]">
            <span className="p-[0_4px] inline-flex items-center">
                <Send size={16} className="mr-1" />
                <span className="text-[15px] font-semibold">{email}</span>
            </span>
            <div className="h-5 w-5 flex items-center justify-center hover:bg-primary-foreground" onClick={() => handleRemove(email)}>
                <X size={16} />
            </div>
        </span>
    );

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Focus input when the container is clicked
        }
    };

    useLayoutEffect(() => {
        if (inputRef.current && email.length > 0) {
            inputRef.current.focus();
        }
    }, [email]);

    return (
        <Popover open={email.length > 0}>
            <PopoverTrigger asChild>
                <div onClick={handleFocus} className="border rounded-md relative p-[8px_12px_8px_12px] min-h-[122px] max-h-[400px] overflow-y-scroll focus:outline-none focus:shadow-[0_0_0_5px_rgba(29,155,209,.4)] focus:rounded-[8px] cursor-text">
                    <div className="inline-block flex-wrap items-center w-full">
                        {/* Render the list of added emails */}
                        {directs.map((email) => (
                            <EmailComponent key={email} email={email} />
                        ))}

                        {/* Input field for new emails */}
                        <input ref={inputRef} value={email} onChange={handleChange} className="m-[0_4px] w-full h-full focus:outline-none" />
                    </div>
                </div>
            </PopoverTrigger>

            {/* Popover for validation message or invite action */}
            <PopoverContent className="w-full min-w-[599px] p-[12px_0]">
                {invalid ? (
                    <div className="w-full p-[0_24px]">
                        <span className="text-[15px] ">Enter a valid email address</span>
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

export default InputDirect;
