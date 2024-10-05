import React from "react";

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bottom-0 overflow-hidden bg-background-slack">
            <div className="h-[40px] w-full "></div>
            <div className="h-[calc(100%_-_40px)] grid grid-cols-[72px_266px_auto]">
                <div className="w-[72px]"></div>
                <div className="bg-[#572759] rounded-tl-[6px]"></div>
                <div className="bg-background"></div>
            </div>
        </div>
    );
};

export default Loading;
