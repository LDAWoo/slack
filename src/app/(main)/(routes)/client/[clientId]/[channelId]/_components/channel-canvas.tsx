import Image from "next/image";

const ChannelCanvas = () => {
    return (
        <div className="flex flex-col overflow-y-auto h-full p-0">
            <div>
                <div className="min-h-[57px] mb-7">
                    <div className="h-[200px] overflow-hidden relative">
                        <Image src={`/assets/jun-cen-the-garden.jpg`} alt="Banner" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelCanvas;
