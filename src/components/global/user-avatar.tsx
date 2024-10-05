import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
    src?: string;
    alt?: string;
    className?: string;
}

const UserAvatar = ({ className, src, alt }: UserAvatarProps) => {
    return (
        <Avatar className={cn("h-9 w-9", className)}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>
                <div className={cn("w-8 h-8 items-center flex justify-center rounded-full overflow-hidden relative", className)}>
                    <Image src={"/assets/default_image.png"} className="object-cover" fill alt="Avatar" />
                </div>
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
