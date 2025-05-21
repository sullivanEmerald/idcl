import AppointmentHeroSection from "@/components/sections/appointment/hero";
import AppointmentHowItWorks from "@/components/sections/appointment/howItWork";
import AppointmentQuestions from "@/components/sections/appointment/questions";
import AppointmentSafety from "@/components/sections/appointment/safety";
import ScheduledAppointment from "@/components/sections/appointment/schedule";
import ContactUs from "@/components/sections/contact/contactUs";


export default function AppointmentPage() {
    return (
        <>
            <AppointmentHeroSection />
            <AppointmentHowItWorks />
            <AppointmentSafety />
            <ScheduledAppointment />
            <AppointmentQuestions />
        </>
    )
}