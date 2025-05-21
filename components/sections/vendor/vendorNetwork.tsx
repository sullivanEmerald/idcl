import Image from "next/image"

export default function VendorNetwork() {
    return (
        <section className="relative w-full h-[263px] py-[87px] flex flex-col items-center justify-center overflow-hidden bg-[#F5F9FF]">
            <div className="w-[867px] flex flex-col gap-[36px] items-center justify-center">
                <h1 className=" font-satoshi font-bold text-[32px] leading-[35px] tracking-normal text-[#3B3B3B]">Why Join the IDCL Vendor Network?</h1>
                <p className="w-[867px] font-satoshi font-light text-[20px] leading-none tracking-normal text-center">
                    Our vendor ecosystem is built on trust, professionalism, and opportunity. Whether you're a freelance expert or a registered company, our platform connects you to high-impact projects in both the public and private sectors.
                </p>
            </div>
        </section>
    )
}