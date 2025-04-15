import Link from 'next/link'
export default function ProfileField({ label, value }: { label: string; value: string }) {
    const isWebsite = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(value);
    return (
        <div>
            <p className="text-xs font-medium text-gray-400">{label}</p>
            <p className="text-sm font-medium">
                {isWebsite ? <Link className='underline text-blue-500' target='_blank' href={value.startsWith('http') ? value : `https://${value}`}>{value}</Link> : value || <span className="text-gray-400">Not specified</span>}
            </p>
        </div>
    );
} 