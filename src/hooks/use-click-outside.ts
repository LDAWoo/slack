"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useClickOutside = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isClickOutside, setIsClickOutside] = useState(false);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsClickOutside(true);
        } else {
            setIsClickOutside(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return {
        isClickOutside,
        ref,
    };
};
