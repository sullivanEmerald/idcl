import Image from "next/image";

export default function FoundersApply() {
    return (
        <section className="bg-white w-full flex flex-col items-center justify-center gap-8">
            <h1 className="text-[#000] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[110%] capitalize text-center mb-8">
                Ready to Join the Founders Development Program?
            </h1>

            {/* Wrapper for form + image */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full max-w-[1200px] px-4 sm:px-6 lg:px-0">
                <div className="flex-1 w-full max-w-[500px]">
                    <Image
                        src="/images/founders/program.jpeg"
                        alt="Founders Program"
                        width={700}
                        height={700}
                        className="w-full h-auto object-cover rounded-[12px] shadow-lg"
                    />
                </div>

                <form className="flex-1 w-full max-w-[720px]">
                    <iframe
                        src="https://office.imodigitalcity.com/founderdojo"
                        title="Partnership Application"
                        width="100%"
                        height="600"
                        className="w-full min-h-[400px] rounded-[12px] border-0"
                        allowFullScreen
                    ></iframe>
                </form>

                {/* Image Section */}
            </div>
        </section>
    );
}
