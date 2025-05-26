import Image from "next/image";
import Link from "next/link";
export default function LogoNew() {
    return (
        <>
            <Link href='/'>
                <Image
                    src="/images/logonew.png"
                    alt="Imo Digital City Limited"
                    width={293}
                    height={81}
                />
            </Link>
        </>
    )
}