import { useEffect, useState, RefObject } from "react";

type ElementPositionProps = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const useElementPosition = (elementRef: RefObject<HTMLElement>) => {
    const [position, setPosition] = useState<ElementPositionProps>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const updatePosition = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                setPosition({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                });
            }
        };

        updatePosition(); // Set initial position when the component mounts.

        window.addEventListener("resize", updatePosition); // Update position on window resize.

        return () => {
            window.removeEventListener("resize", updatePosition);
            setPosition({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            });
        };
    }, [elementRef]);

    return position;
};

export default useElementPosition;
