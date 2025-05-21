import GeneralEllipse from "@/components/general/ellipse";
import VendorBenefits from "@/components/sections/vendor/benefits";
import VendorHeroSection from "@/components/sections/vendor/hero";
import VendorHowItWorks from "@/components/sections/vendor/howItWorsk";
import VendorRegistration from "@/components/sections/vendor/register";
import VendorNetwork from "@/components/sections/vendor/vendorNetwork";
import { names } from "@/data/elllipse";


export default function VendorPage() {
    return (
        <>
            <VendorHeroSection />
            <VendorNetwork />
            <VendorBenefits />
            <VendorRegistration />
            <VendorHowItWorks />
            <GeneralEllipse name={names.commercialization} />
        </>
    )
}