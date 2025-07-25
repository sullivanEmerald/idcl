import GeneralEllipse from "@/components/general/ellipse";
import UpcomingHeroSection from "@/components/sections/upcoming/hero";
import { names } from "@/data/elllipse";
import UpcomingEventSection from "@/components/sections/upcoming/events";

export default function UpcomingEventsPage() {
    return (
        <>
            <UpcomingHeroSection />
            <UpcomingEventSection />
            <GeneralEllipse name={names.upcoming} />
        </>
    )
}
