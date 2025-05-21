import GeneralEllipse from "@/components/general/ellipse";
import PublicFocus from "@/components/sections/public/focus";
import PublicHeroSection from "@/components/sections/public/hero";
import PublicWork from "@/components/sections/public/work";
import { names } from "@/data/elllipse";


export default function PublicPage() {
    return (
        <>
            <PublicHeroSection />
            <PublicFocus />
            <PublicWork />
            <GeneralEllipse name={names.public} />
        </>
    )
}
