import GeneralEllipse from "@/components/general/ellipse"
import InfrastructureBpo from "@/components/sections/infrastructure/bpo"
import { names } from "@/data/elllipse"
import InfrastructureHeroSection from "@/components/sections/infrastructure/hero"
import InfrastructureMain from "@/components/sections/infrastructure/main"
import InfrastructureMobile from "@/components/sections/infrastructure/mobile"
import InfrastructurePress from "@/components/sections/infrastructure/press"
export default function Infrastructure() {
    return (
        <>
            <InfrastructureHeroSection />
            <InfrastructureMain />
            <InfrastructurePress />
            <InfrastructureBpo />
            <InfrastructureMobile />
            <GeneralEllipse name={names.infrastructure} />
        </>
    )
}
