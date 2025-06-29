import IdeaSubmissionForm from "@/components/sections/commercialization/ideasubmissionform";
import Image from "next/image";

export default function IdeaSubmissionPage() {
    return (
        <section className="relative w-full mb-0 min-h-[400px] sm:min-h-[500px] lg:min-h-[618px] flex items-center justify-center">
            {/* Background Images Container - Height constrained */}
            <div className="absolute inset-0 -z-10 h-[400px] sm:h-[500px] lg:h-[618px] max-h-[618px]">
                <Image
                    src="/images/commercializaton/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 -z-10 h-[400px] sm:h-[500px] lg:h-[618px] max-h-[618px]">
                <Image
                    src="/images/commercializaton/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-4xl gap-8">
                <h1 className="font-satoshi w-full max-w-[991px] text-[28px] sm:text-[40px] lg:text-[60px] font-black leading-[32px] sm:leading-[45px] lg:leading-[67px] text-[#fff] text-center">
                    Idea Submission Form – IP Commercialization & Innovation Support
                </h1>
                <div className="w-full flex justify-center items-center">
                    <IdeaSubmissionForm />
                </div>
            </div>
        </section>
    );
}