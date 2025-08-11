import { useEffect, RefObject } from "react";

// Accept an array of refs instead of individual refs
export function useClickOutside(refs: RefObject<HTMLElement>[], callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Check if the click happened outside all the provided refs
            if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, callback]);
}
