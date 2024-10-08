"use client";
import { useRef, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";

interface ISlipPaneCustom {
    split?: "vertical" | "horizontal";
    initialWidthPanel1?: number;
    initialWidthPanel2?: number;
    resizer?: boolean;
    panel1: () => JSX.Element;
    panel2?: () => JSX.Element;
    classPanel1?: string;
    classPanel2?: string;
}

const SlipPaneCustom = ({ split = "vertical", initialWidthPanel1 = 180, initialWidthPanel2 = 180, panel1, panel2, classPanel1, classPanel2, resizer, ...props }: ISlipPaneCustom) => {
    // Updated refs to use the correct type
    const panelContainerRef = useRef<SplitPane | null>(null);
    const panel1Ref = useRef<HTMLDivElement | null>(null);
    const panel2Ref = useRef<HTMLDivElement | null>(null);

    const [width, setWidth] = useState(360);

    const getStylesPanel1 = () => {
        if (resizer) {
            return { maxWidth: `calc(100% - ${initialWidthPanel2}px)`, minWidth: `${initialWidthPanel1}px` };
        } else {
            return { maxWidth: "100%", width: "100%", minWidth: `${initialWidthPanel1}px` };
        }
    };

    const getStylesPanel2 = () => {
        return { width: `calc(100% - ${width}px)`, minWidth: "0px" };
    };

    const handleChange = (e: number) => {
        if (panel2) {
            setWidth(e);
        }
    };

    return (
        <SplitPane ref={panelContainerRef} onChange={handleChange} split={split} pane1Style={getStylesPanel1()} pane2Style={getStylesPanel2()} {...props} defaultSize={200} primary="first" resizerClassName="relative grid w-[2px] after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:w-[8px] after:cursor-col-resize after:hover:bg-[#1d9bff] after:hover:shadow-[0_0_0_1px_#1d9bff] h-full">
            {panel1 && (
                <Pane ref={panel1Ref} className={classPanel1} size="100%">
                    {panel1()}
                </Pane>
            )}
            {panel2 && (
                <Pane ref={panel2Ref} className={classPanel2} size="100%">
                    {panel2()}
                </Pane>
            )}
        </SplitPane>
    );
};

export default SlipPaneCustom;
