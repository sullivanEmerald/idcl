import AboutUsHeroSection from "@/components/sections/about/hero"
import AboutUsWho from "@/components/sections/about/aboutUs"
import AboutUSVision from "@/components/sections/about/vison"
import Mission from "@/components/sections/misson"
import Objectives from "@/components/sections/objective"
import Services from "@/components/sections/services"
import Banner from "@/components/sections/about/banner"
import AboutLeaderShip from "@/components/sections/about/leadership"
import Ellipse from "@/components/sections/ellipse"
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
