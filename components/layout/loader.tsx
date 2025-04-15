import { Loader2 } from "lucide-react"

export default function Loader() {
    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Loader2 className="h-5 w-5 animate-spin" />
        </div>
    )
}