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

export default function AboutUs() {
    return (
        <>
            <AboutUsHeroSection />
            <AboutUsWho />
            <AboutUSVision />
            <Mission isMission={false} />
            <Objectives isObjective={false} />
            <Services isServices={false} />
            <Banner />
            <AboutLeaderShip />
            <GeneralEllipse name={names.about} />
        </>
    )
}
