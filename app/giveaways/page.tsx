"use client"

import { useEffect, useState } from 'react'
import { GiveawayCard } from '@/components/giveaway-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Giveaway } from '@/types/giveaway'
import { giveawayService } from '@/services/giveaway'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

export default function GiveawaysPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [giveaways, setGiveaways] = useState<Giveaway[]>([])
  const [filter, setFilter] = useState<Giveaway['status']>('active')

  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        const data = await giveawayService.getGiveaways({ status: filter })
        setGiveaways(data)
      } catch (error) {
        console.error('Error fetching giveaways:', error)
      }
    }

    fetchGiveaways()
  }, [filter])

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen py-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Giveaways</h1>
          <p className="text-muted-foreground">
            Participate in exciting giveaways or create your own
          </p>
        </div>
        {user && (
          <Button
            onClick={() => router.push('/giveaways/create')}
            className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90"
          >
            Create Giveaway
          </Button>
        )}
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="active"
            onClick={() => setFilter('active')}
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="ended"
            onClick={() => setFilter('ended')}
          >
            Ended
          </TabsTrigger>
          {user && (
            <TabsTrigger
              value="my-giveaways"
              onClick={() => setFilter('draft')}
            >
              My Giveaways
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {giveaways.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {giveaways.map((giveaway) => (
                <GiveawayCard key={giveaway._id} giveaway={giveaway} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No active giveaways at the moment
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ended" className="space-y-4">
          {giveaways.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {giveaways.map((giveaway) => (
                <GiveawayCard key={giveaway._id} giveaway={giveaway} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No ended giveaways</p>
            </div>
          )}
        </TabsContent>

        {user && (
          <TabsContent value="my-giveaways" className="space-y-4">
            {giveaways.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {giveaways.map((giveaway) => (
                  <GiveawayCard key={giveaway._id} giveaway={giveaway} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {"You haven't created any giveaways yet"}
                </p>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}