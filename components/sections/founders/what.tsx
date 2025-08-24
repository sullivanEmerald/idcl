import Image from 'next/image';
const foundersReason = [
    'A year-long startup development journey starting with a high-impact hackathon',
    "Participants receive personalized mentorship, funding access, global exposure, and a fast - track route to pitch in Silicon Valley."
]
export default function FoundersDevelopmentHakathon() {
    return (
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-4 md:px-8 lg:px-16">
            <div className="relative w-full max-w-[400px] h-[260px] md:h-[393px] flex-shrink-0 flex items-center justify-center">
                <Image
                    src="/images/founders/founder.png"
                    alt="founders-group"
                    fill
                    priority
                    className="object-contain rounded-xl shadow-lg"
                />
            </div>
            <div className="w-full max-w-[500px] flex flex-col items-center justify-center text-center gap-4">
                <h1 className="font-satoshi text-2xl sm:text-3xl md:text-5xl font-bold mb-2">From Owerri to the World!!</h1>
                <ul className="list-disc list-inside text-base sm:text-lg md:text-xl text-[#222] space-y-2">
                    {foundersReason.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
