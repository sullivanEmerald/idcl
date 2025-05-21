import GeneralEllipse from "@/components/general/ellipse";
import CommercializationHeroSection from "@/components/sections/commercialization/hero";
import CommercializationImpact from "@/components/sections/commercialization/impact";
import CommercializationProcess from "@/components/sections/commercialization/process";
import CommercializationIpServices from "@/components/sections/commercialization/services";
import { names } from "@/data/elllipse";

export default function CommercializationPage() {
    return (
        <>
            <CommercializationHeroSection />
            <CommercializationProcess />
            <CommercializationIpServices />
            <CommercializationImpact />
            <GeneralEllipse name={names.commercialization} />
        </>
    )
}