import GeneralEllipse from "@/components/general/ellipse";
import TourHeroSection from "@/components/sections/tour/hero";
import TourPerfect from "@/components/sections/tour/perfect";
import TourProcedure from "@/components/sections/tour/procedure";
import TourQuestions from "@/components/sections/tour/questions";
import ScheduledTour from "@/components/sections/tour/schedule";

export default function Tour() {
    return (
        <>
            <TourHeroSection />
            <TourProcedure />
            <TourPerfect />
            <ScheduledTour />
            <TourQuestions />
            <GeneralEllipse />
        </>
    )
}
