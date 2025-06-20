import GeneralEllipse from "@/components/general/ellipse"
import { names } from "@/data/elllipse"
import PartnershipHeroSection from "@/components/sections/partnership/hero"
import GlobalPartners from "@/components/sections/partnership/meeting"
import PartnershipVoices from "@/components/sections/partnership/vocies"
export default function PartnershipPage() {
    return (
        <>
            <PartnershipHeroSection />
            <GlobalPartners />
            <PartnershipVoices />
            <GeneralEllipse name={names.partnership} />
        </>
    )
}
