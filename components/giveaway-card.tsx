import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Giveaway } from '@/types/giveaway'

export interface GiveawayCardProps {
  giveaway: Giveaway
  onEnter?: () => void
  isEntered?: boolean
}

export function GiveawayCard({ giveaway, onEnter, isEntered = false }: GiveawayCardProps) {
  const timeLeft = new Date(giveaway.endDate).getTime() - new Date().getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={giveaway.prize.image || '/placeholder-image.jpg'}
          alt={giveaway.title}
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
        <CardTitle>{giveaway.title}</CardTitle>
        <CardDescription>{giveaway.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Prize:</span>
            <span className="text-sm text-primary">{giveaway.prize.title}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Time Left:</span>
            <span className="text-sm">{daysLeft} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Entries:</span>
            <span className="text-sm">{giveaway.statistics.totalEntries}</span>
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
