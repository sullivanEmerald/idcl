import GeneralEllipse from "@/components/general/ellipse";
import RisingStartUpHeroSection from "@/components/sections/rising/hero";
import StarsSearch from "@/components/sections/rising/search";
import { names } from "@/data/elllipse";


export default function RisingStartUps() {
    return (
        <div>
            <RisingStartUpHeroSection />
            <StarsSearch />
            <GeneralEllipse name={names.startup} />
        </div>
    )
}
