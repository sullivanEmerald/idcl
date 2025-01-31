import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface TaskCardProps {
  title: string
  description: string
  reward: string
  imageUrl: string
  status?: 'completed' | 'in-progress' | 'not-started'
  onStart?: () => void
}

export function TaskCard({ 
  title, 
  description, 
  reward, 
  imageUrl, 
  status = 'not-started',
  onStart 
}: TaskCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Reward:</span>
          <span className="text-sm text-primary">{reward}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={status === 'completed' ? 'secondary' : 'default'}
          disabled={status === 'completed'}
          onClick={onStart}
        >
          {status === 'completed' ? 'Completed' : 'Start Task'}
        </Button>
      </CardFooter>
    </Card>
  )
}
