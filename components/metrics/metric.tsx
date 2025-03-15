import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricProps {
  title: string
  value: string | number
  description?: string
  trend?: string
  icon?: React.ReactNode
  className?: string
}

export function Metric({ 
  title, 
  value, 
  description, 
  icon,
  className 
}: MetricProps) {

  return (
    <Card className={cn('p-6 transition-all hover:scale-[1.02]', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {/* {trend && (
            <p className={cn(
              'mt-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
              isPositiveTrend 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            )}>
              {trend}
            </p>
          )} */}
        </div>
        {icon && (
          <div className="rounded-full bg-white p-2 shadow-sm ring-1 ring-gray-900/5">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
