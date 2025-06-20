import GeneralEllipse from "@/components/general/ellipse";
import TalentHero from "@/components/sections/talents/hero";
import TalentPool from "@/components/sections/talents/pool";


export default function TalentsPage() {

    return (
        <div className="flex flex-col gap-[80px]">
            <TalentHero />
            <TalentPool />
            <GeneralEllipse />
        </div>
    )
}
