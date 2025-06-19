import Image from "next/image"

type EventItem = {
    image: string;
    alt: string;
    header: string;
    text: string;
    body: string;
    day: number;
    month: string;
    time: string;
};

export default function EventDisplay({ image, alt, header, text, body, day, month, time }: EventItem) {
    return (
        <div className="w-full max-w-[362px] mx-auto flex flex-col items-center">
            {/* Image Container - fixed aspect ratio */}
            {/* 197/362 ≈ 54.4% */}
            <Image
                src={image}
                alt={alt}
                width={285}
                height={197}
                className="object-cover rounded-t-[10px] w-full"
                priority
            />


            {/* Content Container */}
            <div className="w-full py-3 px-5 sm:py-[14px] sm:px-[21px] rounded-b-[18.95px] border border-t-0 border-[#CACACA] bg-white flex flex-col gap-2 sm:gap-[8px]">
                {/* Header Section */}
                <div className="w-full flex flex-col gap-2 sm:gap-[9px]">
                    <h1 className="text-black font-satoshi text-base sm:text-[16px] font-bold leading-6 sm:leading-[24px]">
                        {header}
                    </h1>

                    <div className="bg-black w-fit px-3 py-1 rounded-[15px] border border-[rgba(0,0,0,0.23)]">
                        <p className="font-satoshi text-white text-sm sm:text-[14px] font-bold leading-5 sm:leading-[21px]">
                            {text}
                        </p>
                    </div>

                    <p className="font-satoshi text-sm sm:text-[14px] font-normal leading-5 sm:leading-[21px] text-[#6A6A6A] line-clamp-2">
                        {body}
                    </p>
                </div>

                {/* Date/Time Section */}
                <div className="flex justify-between items-center w-full mt-2">
                    <div className="flex items-center gap-2 sm:gap-[10px]">
                        <p className="font-satoshi font-bold text-xl sm:text-[28px] text-black">
                            {day}
                        </p>
                        <p className="font-satoshi font-bold text-sm sm:text-[16px] text-blue-600">
                            {month}
                        </p>
                    </div>
                    <p className="font-satoshi font-bold text-sm sm:text-[16px] text-[#7C7C7C]">
                        {time}
                    </p>
                </div>
            </div>
        </div>
    )
}