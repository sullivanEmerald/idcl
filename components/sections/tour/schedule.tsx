"use client"
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ScheduledTour() {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    return (
        <div className="w-full flex flex-col items-center justify-center py-[60px] px-4 bg-white">
            <section className="w-full max-w-[834px] rounded-[16px] p-2 flex flex-col gap-6 items-center border border-solid border-[#E4E4E4]">
                <div className="w-full relative min-h-[600px]">
                    {!iframeLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20 rounded-[12px]">
                            <Loader2 className="animate-spin text-blue-400" />
                        </div>
                    )}
                    <iframe
                        src="https://office.imodigitalcity.com/tour"
                        title="Startup Application"
                        width="100%"
                        height="900"
                        className="w-full min-h-[600px] rounded-[12px] border-0"
                        allowFullScreen
                        onLoad={() => {
                            // Fix: Only set as loaded if the iframe's contentWindow is accessible and loaded
                            setTimeout(() => setIframeLoaded(true), 500);
                        }}
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
