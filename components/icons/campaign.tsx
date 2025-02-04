export function CampaignIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21h18" />
      <path d="M3 7v14" />
      <path d="M21 7v14" />
      <path d="M7 14h10" />
      <path d="M7 10h10" />
      <path d="M7 18h10" />
      <path d="M4 3h16a1 1 0 0 1 1 1v3H3V4a1 1 0 0 1 1-1z" />
    </svg>
  )
}
