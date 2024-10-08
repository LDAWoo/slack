"use client";
import EmojiPicker from "@/components/global/emoji-picker";
import Renderer from "@/components/global/renderer";
import UserAvatar from "@/components/global/user-avatar";
import { EmojiPlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Hint from "@/components/ui/hint";
import { MessageWithMemberWithUser, PinWithMemberWithUser, ReactionWithMemberWithUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Member, Reaction, User } from "@prisma/client";
import axios from "axios";
import { format, isToday, isYesterday } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import qs from "query-string";

type ChannelMessagePinItemProps = {
    id: string;
    user: User;
    message: MessageWithMemberWithUser;
    reactions: ReactionWithMemberWithUser[];
    pin: PinWithMemberWithUser;
    member: Member & {
        user: User;
    };
    currentMember: Member;
    body: string;
    isCompact: boolean;
    isUpdated: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    onClick: (messageId: string) => void;
};

const formatFullTime = (date: string) => {
    return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(new Date(date), "MMM d, yyyy")} at ${format(new Date(date), "h:mm:ss a")}`;
};

const ChannelMessagePinItem = ({ id, user, message, reactions, pin, member, currentMember, body, isCompact, isUpdated, deleted, createdAt, updatedAt, socketUrl, socketQuery, onClick }: ChannelMessagePinItemProps) => {
    const router = useRouter();

    const handleReaction = async (emoji: string, reactionId?: string, isOwner?: boolean) => {
        try {
            const existingEmoji = reactions ? reactions.find((reaction) => reaction.emoji === emoji && reaction.member.user.id === user.id) : null;

            const url = qs.stringifyUrl({
                url: `${socketUrl}/reaction/${id}`,
                query: {
                    ...socketQuery,
                    reactionId: reactionId || existingEmoji?.id,
                },
            });

            if (isOwner || existingEmoji) {
                await axios.delete(url);
            } else {
                await axios.patch(url, { emoji });
            }
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const groupedReactions = (reactions: ReactionWithMemberWithUser[]) => {
        return reactions.reduce<{
            [emoji: string]: {
                count: number;
                users: User[];
                reaction: Reaction;
            };
        }>((acc, reaction) => {
            if (!acc[reaction.emoji]) {
                acc[reaction.emoji] = {
                    count: 0,
                    users: [],
                    reaction: reaction,
                };
            }

            acc[reaction.emoji].count += 1;
            acc[reaction.emoji].users.push(reaction.member.user);

            return acc;
        }, {});
    };

    return (
        <div className="flex flex-row gap-2 p-3 border border-border rounded-md bg-background cursor-pointer" onClick={() => onClick(id)}>
            <div className="flex items-start gap-2">
                <button>
                    <UserAvatar src={member.user.imageUrl as string} className="rounded-lg" />
                </button>
            </div>
            <div className="flex flex-col w-full overflow-hidden -translate-y-[4px]">
                <div className="text-[15px]">
                    <button className="font-bold text-primary hover:underline">{member.user.username}</button>
                    <span>&nbsp;&nbsp;</span>
                    <Hint content={formatFullTime(createdAt)} isPortal>
                        <button className="text-[12px] text-[#616061] leading-[22px] hover:underline">
                            {format(new Date(createdAt), "hh")} h {format(new Date(createdAt), "mm")}
                        </button>
                    </Hint>
                </div>
                <div className="flex flex-row items-center">
                    <Renderer body={body} />
                    {isUpdated && !deleted && <span className="translate-y-[1px] text-[13px] mx-2 text-[#868686]">(edited)</span>}
                </div>
                {reactions && reactions.length > 0 && (
                    <div className="mb-1 flex flex-wrap mt-1">
                        {Object.values(groupedReactions(reactions)).map(({ count, users, reaction }) => {
                            const isOwner = users.some((u: User) => u.id === user.id);

                            return (
                                <div key={reaction.id} className="mb-1">
                                    <Hint
                                        isPortal
                                        sideOffset={10}
                                        content={() => (
                                            <div className="flex flex-col w-[200px] gap-2 items-center">
                                                <div className="h-[64px] w-[64px] bg-background rounded-[10px] flex items-center justify-center">
                                                    <div className="relative h-8 w-8 rounded-[10px]">
                                                        <Image src={reaction.emoji} alt="emoji" fill className="inset-0 object-cover overflow-hidden" />
                                                    </div>
                                                </div>
                                                <span className="text-[13px]">{isOwner ? "You (click to delete)" : `${users[0].username} reacted`}</span>
                                            </div>
                                        )}
                                    >
                                        <Button
                                            onClick={() => handleReaction(reaction.emoji, reaction.id, isOwner)}
                                            className={cn("text-[#1263a3] p-[0_8px] gap-1 items-center w-fit mb-1 ml-1 mr-1 duration-0 rounded-full h-6 bg-[#e3f8ff] hover:bg-[#e3f8ff] text-[12px] font-medium leading-[22px] shadow-[0_0_0_1px_#1264a3]", {
                                                "bg-[#1d1c1d0f] shadow-none hover:shadow-[0_0_0_1px_#000] hover:bg-background text-muted-foreground": !isOwner,
                                            })}
                                        >
                                            <div className="relative h-4 w-4">
                                                <Image src={reaction.emoji} alt="emoji" fill className="object-cover" />
                                            </div>
                                            <span>{count}</span>
                                        </Button>
                                    </Hint>
                                </div>
                            );
                        })}

                        <Hint content={"Add a reaction"} isPortal sideOffset={10}>
                            <EmojiPicker
                                emojiComponent={() => (
                                    <Button className={cn("p-[0_8px] gap-1 items-center w-fit mb-1 ml-1 mr-1 duration-0 rounded-full h-6 bg-[#1d1c1d0f] shadow-none hover:shadow-[0_0_0_1px_#000] hover:bg-background text-muted-foreground")}>
                                        <EmojiPlus size={18} />
                                    </Button>
                                )}
                                side="right"
                                onChange={(emoji: any) => {
                                    const url = `https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/${emoji.unified}.png`;
                                    handleReaction(url);
                                }}
                            />
                        </Hint>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChannelMessagePinItem;
