"use client";
import { HomeFillIcon, HomeIcon, UserPlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hint from "@/components/ui/hint";
import { useGetWorkspaceQuery } from "@/lib/shared/workspace/workspace-api";
import { cn } from "@/lib/utils";
import { EllipsisIcon, Plus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { memo } from "react";
import { FiEdit } from "react-icons/fi";

const Sidebar = () => {
  const params = useParams();
  const clientId = params?.clientId;
  const { data } = useGetWorkspaceQuery(clientId as string);
  const workspace = data?.workspace;
  const workspaceStep = workspace?.step ?? 0;
  const opening = workspaceStep === 6;

  const workspaceName = workspace?.name || "";
  const iconStyle = "w-[36px] h-[36px] flex items-center justify-center";

  const user = {};
  console.log(data);

  return (
    <div className="flex flex-col items-center h-[calc(100vh_-_40px)] pt-2">
      {workspaceName && (
        <div
          className={`${iconStyle} bg-background-slack-secondary text-white rounded-lg mb-3`}
        >
          <span className="text-2xl font-bold uppercase">
            {workspaceName[0]}
          </span>
        </div>
      )}

      <div className="flex flex-col items-center gap-0.5 p-2">
        <div
          className={cn(iconStyle, "rounded-lg", {
            "bg-background-slack-secondary text-white": workspaceStep > 2,
            "bg-[#532255] text-foreground-slack": workspaceStep <= 2,
          })}
        >
          {workspaceStep > 2 ? (
            <HomeFillIcon size={20} />
          ) : (
            <HomeIcon size={20} />
          )}
        </div>
        <span
          className={cn("text-xs font-semibold text-transparent", {
            "text-white": workspaceStep > 2,
          })}
        >
          Welcome
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1 p-2">
        <div
          className={cn(iconStyle, "text-foreground-slack", {
            "hover:bg-background-slack-secondary text-white rounded-lg cursor-pointer transition":
              workspaceStep === 6,
          })}
        >
          <EllipsisIcon size={20} />
        </div>
        <span
          className={cn("text-xs font-bold text-transparent", {
            "text-white": workspaceStep === 6,
          })}
        >
          Plus
        </span>
      </div>

      <div className="w-full pb-6 flex flex-col items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={!opening}>
            <Hint
              side="right"
              sideOffset={10}
              disabled={!opening}
              content="Create a new one"
            >
              <Button className="bg-background-slack-secondary hover:bg-foreground-slack rounded-full p-2">
                <Plus size={16} />
              </Button>
            </Hint>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            sideOffset={6}
            className="w-72 p-0 rounded-lg border-none"
          >
            <DropdownMenuLabel className="p-4 text-lg font-extrabold">
              Create
            </DropdownMenuLabel>
            <Button
              variant="ghost"
              className="flex items-center p-4 w-full font-normal"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f4daff] rounded-full flex items-center justify-center">
                  <FiEdit size={18} />
                </div>
                <div>
                  <span className="block text-sm font-semibold">Message</span>
                  <span className="block text-xs text-muted-foreground">
                    Start a conversation in a direct message or channel
                  </span>
                </div>
              </div>
            </Button>
            <DropdownMenuSeparator className="my-1 bg-border" />
            <Button
              variant="ghost"
              className="flex items-center p-4 w-full font-normal"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full group-hover:bg-border transition">
                  <UserPlusIcon size={18} />
                </div>
                <span className="font-semibold">Invite people</span>
              </div>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={!opening}>
            <Hint
              side="right"
              sideOffset={10}
              disabled={opening}
              content={() => (
                <span className="inline-flex items-center">
                  {user?.username} 134
                  <div className="relative w-3.5 h-3.5 ml-1">
                    <span className="absolute w-full h-full bg-black rounded-full z-0"></span>
                    <span className="absolute w-2.5 h-2.5 bg-[#2BAC76] rounded-full z-10"></span>
                  </div>
                </span>
              )}
            >
              <div
                className={cn("relative cursor-pointer", iconStyle, {
                  "opacity-100": opening,
                })}
              >
                <Image
                  src={user?.imageUrl || `/assets/default_image.png`}
                  fill
                  alt="workspace_logo"
                  className="object-cover rounded-lg overflow-hidden"
                />
                {opening && (
                  <div className="absolute w-3.5 h-3.5 -bottom-1 -right-1 bg-background-slack rounded-full">
                    <span className="absolute w-2.5 h-2.5 bg-[#2BAC76] rounded-full"></span>
                  </div>
                )}
              </div>
            </Hint>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            align="end"
            sideOffset={6}
            className="w-72 p-3 rounded-lg border-none"
          >
            <div className="flex items-center p-4 gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden">
                <Image
                  src={user?.imageUrl || "/assets/default_image.png"}
                  fill
                  alt="avatar"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-bold">{user?.username}</span>
                <span className="flex items-center text-xs text-muted-foreground mt-1">
                  Available
                </span>
              </div>
            </div>
            <DropdownMenuSeparator className="my-2 bg-border" />
            {["Profile", "Preferences"].map((text) => (
              <DropdownMenuItem
                key={text}
                className="text-base leading-[28px] p-4 hover:bg-background-slack-button-active"
              >
                {text}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="my-2 bg-border" />
            <DropdownMenuItem className="text-base leading-[28px] p-4 hover:bg-background-slack-button-active">
              Sign out of {workspaceName}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default memo(Sidebar);
