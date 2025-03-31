
export default function ProfileField({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <p className="text-xs font-medium text-gray-400">{label}</p>
            <p className="text-sm font-medium">
                {value || <span className="text-gray-400">Not specified</span>}
            </p>
        </div>
    );
} 