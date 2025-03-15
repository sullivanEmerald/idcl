/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
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
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({ 
    from: addDays(new Date(), -30),
    to: new Date()
  });
  const [myRank, setMyRank] = useState<{ rank: number; totalPromoters: number } | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
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
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Promoter Leaderboard</h1>
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
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
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

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Top Performing Promoters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.promoterId} 
                className="flex items-center justify-between p-6 rounded-lg transition-colors bg-white shadow-sm border hover:bg-gray-50"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-2xl font-bold ${index < 3 ? 'text-primary' : 'text-gray-900'}`}>#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{entry.name}</p>
                    <p className="text-sm text-gray-600">
                      Score: {entry.score.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-8 text-right">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{entry.metrics.totalReach}</p>
                    <p className="text-sm text-gray-600">Reach</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{entry.metrics.totalEngagements}</p>
                    <p className="text-sm text-gray-600">Engagements</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{entry.metrics.totalConversions}</p>
                    <p className="text-sm text-gray-600">Conversions</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{entry.metrics.engagementRate.toFixed(1)}%</p>
                    <p className="text-sm text-gray-600">Eng. Rate</p>
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