import HeroSection from "@/components/sections/hero";
import Glance from "@/components/sections/glance";
import Mission from "@/components/sections/misson";
import Objectives from "@/components/sections/objective";
import Services from "@/components/sections/services";
import Updates from "@/components/sections/updates";
import Testimonials from "@/components/sections/testimonial";
import Partners from "@/components/sections/partners";
import GeneralEllipse from "@/components/general/ellipse";
import { names } from "@/data/elllipse";

export default function Header() {
  return (
    <>
      <HeroSection />
      <Glance />
      <Mission isMission={true} />
      <Objectives isObjective={true} />
      <Services isServices={true} />
      <Updates />
      <Testimonials />
      <Partners />
      <GeneralEllipse name={names.home} />
    </>
  )
}