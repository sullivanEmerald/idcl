"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SummerTechBootcampPage() {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    return (
        <div className="w-full min-h-screen bg-white relative">
            {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20 pointer-events-none">
                    <Loader2 className="animate-spin text-blue-400 w-10 h-10" />
                </div>
            )}
            <iframe
                src="https://office.imodigitalcity.com/summer-tech-bootcamp"
                title="Summer Tech Bootcamp Application"
                width="100%"
                height="100%"
                className="w-full min-h-screen border-0"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                style={{ background: "#fff" }}
            ></iframe>
        </div>
    );
}