
import GeneralEllipse from "@/components/general/ellipse";
import StartUpAnalytics from "@/components/sections/startup/analytics";
import StartUpFounders from "@/components/sections/startup/founders";
import StartUpHeroSection from "@/components/sections/startup/hero";
import StartUpPartners from "@/components/sections/startup/partners";
import StartUpProgram from "@/components/sections/startup/prgram";
import StartUpProcedure from "@/components/sections/startup/procedures";
import StartUpRisingStars from "@/components/sections/startup/stars";
import { names } from "@/data/elllipse";

export default function StartUps() {
    return (
        <div className="">
            <StartUpHeroSection />
            <StartUpProcedure />
            <StartUpRisingStars />
            <StartUpProgram />
            <StartUpPartners />
            <StartUpAnalytics />
            <StartUpFounders />
            <GeneralEllipse name={names.startup} />
        </div>
    )
}
