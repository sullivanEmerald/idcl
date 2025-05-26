import IdeaSubmissionForm from "@/components/sections/commercialization/ideasubmissionform";
import Image from "next/image";

export default function IdeaSubmissionPage() {
    return (
        <section className="relative w-full mb-0">
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

            {/* Text Content (on top of both images) */}
            <div className="relative z-10 flex flex-col justify-center items-center py-[40px] sm:py-[60px] px-4 sm:px-6 lg:px-0 min-h-[400px] sm:min-h-[500px] lg:min-h-[618px] lg:top-[-100px]">
                <div className="flex flex-col justify-center items-center gap-[30px] sm:gap-[40px] lg:gap-[50px] h-[400px] sm:h-[500px] lg:h-[618px] max-h-[618px]">
                    <h1 className="font-satoshi w-full max-w-[991px] text-[28px] sm:text-[40px] lg:text-[60px] font-black leading-[32px] sm:leading-[45px] lg:leading-[67px] text-[#fff] text-center">
                        Idea Submission Form – IP Commercialization & Innovation Support
                    </h1>
                </div>
                <div className="w-full">
                    <IdeaSubmissionForm />
                </div>
            </div>
        </section>
    );
}