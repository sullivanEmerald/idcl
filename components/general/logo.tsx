import Image from "next/image";
import Link from "next/link";
export default function Logo() {
    return (
        <>
            <Link href='/'>
                <Image
                    src="/images/mainlogo.png"
                    alt="Imo Digital City Limited"
                    width={104.17}
                    height={31}
                />
            </Link>
        </>
    )
}