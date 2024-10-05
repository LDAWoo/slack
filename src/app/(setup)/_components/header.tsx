"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const handleCreateWorkspace = async () => {
        const { data } = await axios.post("/api/workspaces");

        router.push(`/client/${data.id}`);
    };

    return (
        <header>
            <nav className="h-[80px] absolute z-50 top-0 w-full">
                <div className="p-[0_4vw] w-full h-full flex items-center justify-between">
                    <Link href={`/`} className="relative flex w-[100px] h-full items-center">
                        <Image src={`/assets/slack_logo.svg`} fill alt="logo" className="!fill-white pt-[.25rem]" />
                    </Link>
                    <nav className="flex items-center w-full flex-[1] relative">
                        <div className="flex-[1] flex mt-[1.125rem] items-center"></div>
                        <Button onClick={handleCreateWorkspace} className="bg-white hover:bg-white duration-300 h-[45px] p-[.75rem_1rem] hover:shadow-[inset_0_0_0_2px_#611f69] transition-shadow text-[#611f69] rounded-[4px] ml-1">
                            <span className="uppercase text-sm font-semibold"> Create a workspace</span>
                        </Button>
                    </nav>
                    <Button className="flex lg:hidden h-full w-[20px] bg-transparent hover:bg-transparent ml-[2rem] p-0">
                        <Menu size={26} className="text-black" />
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
