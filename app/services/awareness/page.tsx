import GeneralEllipse from "@/components/general/ellipse";
import AwarenessUpcomingEvents from "@/components/sections/awarness/events";
import AwarenessHeroSection from "@/components/sections/awarness/hero";
import AwareLearning from "@/components/sections/awarness/learn";
import AwarnessTarget from "@/components/sections/awarness/target";
import AwarenessTestimonials from "@/components/sections/awarness/testimonials";
import { names } from "@/data/elllipse";

export default function AwarenessPage() {
    return (
        <>
            <AwarenessHeroSection />
            <AwareLearning />
            <AwarnessTarget />
            <AwarenessUpcomingEvents />
            <AwarenessTestimonials />
            <GeneralEllipse name={names.awareness} />
        </>
    )
}
