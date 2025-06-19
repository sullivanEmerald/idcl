import GeneralEllipse from "@/components/general/ellipse";
import HeroSection from "@/components/sections/events/hero";
import EventsHub from "@/components/sections/events/hub";
import EventsInnovation from "@/components/sections/events/innovation";
import EventsTech from "@/components/sections/events/tech";
import EventsWhyUs from "@/components/sections/events/whyus";
import { names } from "@/data/elllipse";
import UpcomingEventCom from "@/components/general/upcoming";

export default function EventsPage() {
    return (
        <>
            <HeroSection />
            <EventsInnovation />
            <UpcomingEventCom />
            <EventsTech />
            <EventsHub />
            <EventsWhyUs />
            <GeneralEllipse name={names.upcoming} />
        </>
    )
}
