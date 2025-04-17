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
    <Card className={cn('p-4 sm:p-5 md:p-6 transition-all hover:scale-[1.02]', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold truncate">{value}</p>
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">{description}</p>
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
          <div className="rounded-full bg-white p-1.5 sm:p-2 shadow-sm ring-1 ring-gray-900/5 flex-shrink-0 ml-2">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
