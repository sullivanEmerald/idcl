import Image from 'next/image';
const foundersReason = [
    'A year-long startup development journey starting with a high-impact hackathon',
    "Participants receive personalized mentorship, funding access, global exposure, and a fast - track route to pitch in Silicon Valley."
]
export default function FoundersDevelopmentHakathon() {
    return (
        <section>
            <div className='relative w-full h-[393px]'>
                <Image
                    src="/images/founders/founder.png"
                    alt="founders-group"
                    fill
                    priority
                    className='object-contain'
                />
            </div>
            <div>
                <h1>What is the Founders Development Hackathon?</h1>
                <ul>
                    {foundersReason.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
