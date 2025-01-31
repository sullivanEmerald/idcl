import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface GiveawayCardProps {
  title: string
  description: string
  prize: string
  imageUrl: string
  endDate: Date
  entriesCount: number
  isEntered?: boolean
  onEnter?: () => void
}

export function GiveawayCard({
  title,
  description,
  prize,
  imageUrl,
  endDate,
  entriesCount,
  isEntered = false,
  onEnter
}: GiveawayCardProps) {
  const timeLeft = new Date(endDate).getTime() - new Date().getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        {isEntered && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary">Entered</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Prize:</span>
            <span className="text-sm text-primary">{prize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Time Left:</span>
            <span className="text-sm">{daysLeft} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Entries:</span>
            <span className="text-sm">{entriesCount}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isEntered ? 'secondary' : 'default'}
          disabled={isEntered}
          onClick={onEnter}
        >
          {isEntered ? 'Entered' : 'Enter Giveaway'}
        </Button>
      </CardFooter>
    </Card>
  )
}
