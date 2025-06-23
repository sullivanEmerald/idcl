import { useParams } from "next/navigation"

export default function UniqueNews() {
    const { id } = useParams();

    return (
        <>
            <p>IDCL</p>
        </>
    )
}