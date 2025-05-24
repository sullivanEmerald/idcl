import GeneralEllipse from "@/components/general/ellipse";
import JobGallery from "@/components/sections/jobs/gallery";
import JobsHeroSection from "@/components/sections/jobs/hero";
import JobOpenings from "@/components/sections/jobs/jobOpenings";
import JobsWhyWorkWithUs from "@/components/sections/jobs/whyWorkWithUs";

export default function JobsPage() {
    return (
        <>
            <JobsHeroSection />
            <JobsWhyWorkWithUs />
            <JobGallery />
            <JobOpenings />
            <GeneralEllipse />
        </>
    )
}
