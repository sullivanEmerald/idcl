import GeneralEllipse from "@/components/general/ellipse";
import TalentDigital from "@/components/sections/talents/digital";
import TalentExpertise from "@/components/sections/talents/expertise";
import TalentHero from "@/components/sections/talents/hero";
import TalentHire from "@/components/sections/talents/hire";
import TalentOrganisation from "@/components/sections/talents/organisation";
import TalentTestimonials from "@/components/sections/talents/stories";
import { names } from "@/data/elllipse";


export default function EventsPage() {
    return (
        <div className="flex flex-col gap-[80px]">
            <TalentHero />
            <TalentDigital />
            <TalentExpertise />
            <TalentOrganisation />
            <TalentHire />
            <TalentTestimonials />
            <GeneralEllipse name={names.talents} />
        </div>
    )
}
