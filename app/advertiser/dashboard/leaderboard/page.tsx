/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { addDays } from 'date-fns';
import { LeaderboardEntry, leaderboardService } from '@/services/leaderboard';
import { useAuth } from '@/hooks/use-auth';

export default function PromoterLeaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [campaignGoal, setCampaignGoal] = useState<'awareness' | 'engagement' | 'conversion'>('awareness');
  const [dateRange, setDateRange] = useState<DateRange>({ 
    from: addDays(new Date(), -30),
    to: new Date()
  });
  const [myRank, setMyRank] = useState<{ rank: number; totalPromoters: number } | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (!dateRange.from || !dateRange.to) return;

        const [leaderboardData, rankData] = await Promise.all([
          leaderboardService.getLeaderboard({
            campaignGoal,
            timeRange: {
              start: dateRange.from,
              end: dateRange.to
            },
            limit: 10
          }),
          leaderboardService.getPromoterRank(user?.id || '', {
            campaignGoal,
            timeRange: {
              start: dateRange.from,
              end: dateRange.to
            }
          })
        ]);

        setLeaderboard(leaderboardData);
        setMyRank({
          rank: rankData.rank,
          totalPromoters: rankData.totalPromoters
        });
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, [campaignGoal, dateRange, user?.id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <div className="flex gap-4">
          <Select value={campaignGoal} onValueChange={(value: any) => setCampaignGoal(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">Awareness</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange date={dateRange} setDate={(date) => date && setDateRange(date)} />
        </div>
      </div>

      {myRank && (
        <Card>
          <CardHeader>
            <CardTitle>Your Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{myRank.rank} / {myRank.totalPromoters}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div key={entry.promoterId} className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg border">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold">{index + 1}</span>
                  <div>
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Score: {entry.score.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="font-medium">{entry.metrics.totalReach}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engagements</p>
                    <p className="font-medium">{entry.metrics.totalEngagements}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="font-medium">{entry.metrics.totalConversions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eng. Rate</p>
                    <p className="font-medium">{entry.metrics.engagementRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}