"use client";
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
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [dialogOpen, setDialogOpen] = useState(true);
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-[350px] sm:h-[400px] md:h-[500px] lg:h-[500px] rounded-[16px] p-0 border border-[#E4E4E4]"
          style={{ overflow: 'hidden' }}
        >
          <DialogHeader>
            <DialogDescription>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] rounded-[16px] overflow-hidden">
                <Image
                  src="/images/summer/bootcamp.jpeg"
                  alt="Summer Tech Bootcamp"
                  fill
                  className="object-cover w-full h-full"
                  style={{ zIndex: 1 }}
                  priority
                />
                {/* Close button top right */}
                <button
                  onClick={() => setDialogOpen(false)}
                  className="absolute top-0 right-0 m-6 px-4 py-2 rounded-full bg-white/80 text-[#005DFF] font-bold hover:bg-white transition shadow-lg z-20"
                  aria-label="Close dialog"
                >
                  Close
                </button>
                {/* Learn More button bottom center */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center w-full z-20">
                  <Link
                    href="/summer-tech-bootcamp"
                    className="px-6 py-2 rounded-full bg-[#005DFF] text-white font-semibold hover:bg-[#003399] transition shadow-lg border-2 border-white drop-shadow-lg"
                    style={{ background: 'rgba(0,93,255,0.95)' }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}