import FoundersDevelopmentProgramPage from "@/components/sections/founders/hero";
import FoundersDevelopmentHakathon from "@/components/sections/founders/what";
import FoundersQualification from "@/components/sections/founders/eligible";
import GeneralEllipse from "@/components/general/ellipse";
import FoundersLearn from "@/components/sections/founders/learn";
import FoundersProgram from "@/components/sections/founders/program";
import FoundersFaqs from "@/components/sections/founders/faqs";
import { names } from "@/data/elllipse";
import FoundersApply from "@/components/sections/founders/apply";
export default function FoundersDevelopmentProgram() {
    return (
        <>
            <FoundersDevelopmentProgramPage />
            <FoundersDevelopmentHakathon />
            <FoundersProgram />
            <FoundersLearn />
            <FoundersApply />
            <FoundersQualification />
            <FoundersFaqs />
            <GeneralEllipse name={names.founders} />
        </>
    );
}