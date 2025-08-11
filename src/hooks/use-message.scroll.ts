"use client";
import { useEffect, useState } from "react";

type MessageScrollProps = {
    topRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
};

export const useMessageScroll = ({ topRef, bottomRef, loadMore, shouldLoadMore, count }: MessageScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = topRef?.current;

        if (!hasInitialized && topDiv) {
            topDiv.scrollTop = topDiv.scrollHeight;
            setHasInitialized(true);
        }

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
    }, [shouldLoadMore, loadMore, topRef, hasInitialized]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = topRef?.current;

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
    }, [bottomRef, topRef, count, hasInitialized]);
};
