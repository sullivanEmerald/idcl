import Image from "next/image";
import IdeaSubmissionForm from "./ideasubmissionform";
export default function IdeaSubmissionHeroSection() {
    return (
        <section className="relative w-full min-h-[618px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/commercializaton/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/commercializaton/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content (on top of both images) */}
            <div className="relative z-10  flex flex-col justify-center items-center gap-[50px] py-[80px]">
                <h1 className="font-satoshi w-[991px] text-[60px] font-black leading-[67px] text-[#fff]">Idea Submission Form – IP Commercialization & Innovation Support </h1>
                <IdeaSubmissionForm />
            </div>
        </section>
    );
}