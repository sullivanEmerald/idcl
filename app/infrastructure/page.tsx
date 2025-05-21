import InfrastructureBpo from "@/components/sections/infrastructure/bpo"
import InfrastructureEllipse from "@/components/sections/infrastructure/ellipse"
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
            <InfrastructureEllipse />
        </>
    )
}
