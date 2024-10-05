"use client";
import { useEffect, useState } from "react";

type MessageScrollProps = {
    messageRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
};

export const useMessageScroll = ({ messageRef, bottomRef, loadMore, shouldLoadMore, count }: MessageScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = messageRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore();
            }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll);
        };
    }, [shouldLoadMore, loadMore, messageRef]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = messageRef?.current;

        if (!hasInitialized && bottomDiv) {
            setHasInitialized(true);
            bottomDiv.scrollIntoView();
        } else if (topDiv) {
            const isAtBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight < 1;
            if (isAtBottom && bottomDiv) {
                setTimeout(() => {
                    bottomDiv.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [bottomRef, messageRef, count, hasInitialized]);
};
