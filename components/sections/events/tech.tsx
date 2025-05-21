const TechOccations = [
    {
        image: '/images/tech/one.png',
        alt: 'Tech',
        header: 'Hackathons & Coding Camps',
        body: 'Upload unlimited external lists like tax liens, absentee owners, foreclosure notices — and stack them all.'
    },
    {
        image: '/images/tech/two.png',
        alt: 'Tech',
        header: 'Innovation Labs & Demo Days ',
        body: 'Equipped with digital screens, 3D printers, and live-stream capabilities.'
    },
    {
        image: '/images/tech/three.png',
        alt: 'Tech',
        header: 'Conferences & Keynotes',
        body: 'Fully furnished halls with smart lighting, sound, and video systems.'
    },
    {
        image: '/images/tech/four.png',
        alt: 'Tech',
        header: 'Corporate Meetings & Trainings',
        body: 'Modular seating, whiteboards, and digital presentation tools.'
    },
    {
        image: '/images/tech/five.png',
        alt: 'Tech',
        header: 'Government & NGO Workshops',
        body: 'Secure environment, translation booths, and policy-focused amenities.'
    },
    {
        image: '/images/tech/six.png',
        alt: 'Tech',
        header: 'Startup Showcases ',
        body: 'Pitch-ready stages and networking spaces.'
    },
]
export default function EventsTech() {
    return (
        <>
            <section className="w-full flex flex-col items-center justify-center py-[50px] gap-[55px]">
                <div className="w-[1200px] h-[35] flex items-center justify-center">
                    <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">Tech-Forward Facilities for Every Occasion</p>
                </div>
                <div className="w-[1200px] h-[883] flex flex-wrap gap-[40px]">
                    {TechOccations.map((item, index) => (
                        <div key={index} className="w-[372px] h-[383px] bg-[#F9FAFB] pt-[21px] pr-[19px] pb-[13px] pl-[19px] rounded-[32px] flex flex-col gap-[16px]">
                            <img src={item.image} alt={item.alt} className="block object-cover" />
                            <div className="w-[334px] h-[104] flex flex-col gap-[16px]">
                                <p className="w-[334px] font-satoshi font-bold text-[16px] leading-none tracking-normal text-[#1D2939]">{item.header}</p>
                                <p className="w-[334px] font-satoshi font-light text-[16px] leading-[1.35] tracking-normal text-[#475467]">{item.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
