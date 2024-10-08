"use client";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";

interface RendererProps {
    body: string;
}

const Renderer: React.FC<RendererProps> = ({ body }) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const rendererRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!rendererRef.current) return;

        const container = rendererRef.current;

        const quill = new Quill(document.createElement("div"), {
            theme: "snow",
        });

        quill.enable(false);

        const contents = JSON.parse(body);
        quill.setContents(contents);

        const isEmpty =
            quill
                .getText()
                .replace(/<(.|\n)*?>/g, "")
                .trim().length === 0;
        setIsEmpty(isEmpty);

        container.innerHTML = quill.root.innerHTML;

        return () => {
            if (container) {
                container.innerHTML = "";
            }
        };
    }, [body]);

    if (isEmpty) return null;

    return <div ref={rendererRef} className="ql-editor ql-renderer"></div>;
};

export default Renderer;
