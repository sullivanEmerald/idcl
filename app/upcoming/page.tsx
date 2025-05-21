import GeneralEllipse from "@/components/general/ellipse";
import UpcomingEventCom from "@/components/general/upcoming";
import UpcomingHeroSection from "@/components/sections/upcoming/hero";
import { upcomingEventsSccheduled } from "@/data/upcoming";
import { names } from "@/data/elllipse";

export default function UpcomingEventsPage() {
    return (
        <>
            <UpcomingHeroSection />
            <UpcomingEventCom EventsData={upcomingEventsSccheduled} />
            <GeneralEllipse name={names.upcoming} />
        </>
    )
}
