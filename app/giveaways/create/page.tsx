/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { giveawayService } from '@/services/giveaway';

interface Task {
  type: string;
  description: string;
  points: number;
  requirements: Record<string, any>;
}

export default function CreateGiveaway() {
  const { user } = useAuth()
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: {
      title: '',
      description: '',
      value: 0,
      quantity: 1
    },
    startDate: new Date(),
    endDate: new Date(),
    numberOfWinners: 1,
    rules: [],
    creatorType: 'advertiser' as const,
    eligibility: {
      maxWinners: 1
    },
    status: 'draft' as const,
    isEntered: false,
    creatorId: '' // This will be set from the authenticated user
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'prizeTitle') {
      setFormData(prev => ({
        ...prev,
        prize: {
          ...prev.prize,
          title: value
        }
      }));
    } else if (name === 'prizeDescription') {
      setFormData(prev => ({
        ...prev,
        prize: {
          ...prev.prize,
          description: value
        }
      }));
    } else if (name === 'prizeValue') {
      setFormData(prev => ({
        ...prev,
        prize: {
          ...prev.prize,
          value: parseFloat(value) || 0
        }
      }));
    } else if (name === 'prizeQuantity') {
      setFormData(prev => ({
        ...prev,
        prize: {
          ...prev.prize,
          quantity: parseInt(value) || 1
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    if (date) {
      setFormData(prev => ({ ...prev, [field]: date }));
    }
  };

  const handleAddTask = () => {
    setTasks(prev => [...prev, {
      type: '',
      description: '',
      points: 1,
      requirements: {}
    }]);
  };

  const handleTaskChange = (index: number, field: keyof Task, value: any) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index] = { ...newTasks[index], [field]: value };
      return newTasks;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const giveawayData = {
        ...formData,
        tasks: tasks.map(task => ({
          type: task.type as 'follow' | 'share' | 'like' | 'comment' | 'custom',
          description: task.description,
          entries: task.points,
          required: true,
          verificationMethod: 'manual' as const,
          requirements: task.requirements
        })),
        eligibility: {
          ...formData.eligibility,
          maxWinners: formData.numberOfWinners
        },
        creatorId: user?.id || '',
        isEntered: false
      };

      await giveawayService.createGiveaway(giveawayData);
      toast({
        title: 'Success',
        description: 'Giveaway created successfully!',
      });
      router.push('/giveaways');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to create giveaway. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-20">
      <Card>
        <CardHeader>
          <CardTitle>Create New Giveaway</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter giveaway title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter giveaway description"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Prize Details</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    name="prizeTitle"
                    value={formData.prize.title}
                    onChange={handleInputChange}
                    placeholder="Enter prize title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    name="prizeDescription"
                    value={formData.prize.description}
                    onChange={handleInputChange}
                    placeholder="Enter prize description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Value</label>
                  <Input
                    type="number"
                    name="prizeValue"
                    value={formData.prize.value}
                    onChange={handleInputChange}
                    placeholder="Enter prize value"
                    min={0}
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <Input
                    type="number"
                    name="prizeQuantity"
                    value={formData.prize.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter prize quantity"
                    min={1}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <DatePicker
                    date={formData.startDate}
                    onChange={(date: Date | undefined) => handleDateChange(date as Date, 'startDate')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <DatePicker
                    date={formData.endDate}
                    onChange={(date: Date | undefined) => handleDateChange(date as Date, 'endDate')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Number of Winners</label>
                <Input
                  type="number"
                  name="numberOfWinners"
                  value={formData.numberOfWinners}
                  onChange={handleInputChange}
                  min={1}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Tasks</h3>
                  <Button type="button" onClick={handleAddTask}>Add Task</Button>
                </div>

                {tasks.map((task, index) => (
                  <Card key={index}>
                    <CardContent className="space-y-4 pt-6">
                      <Input
                        placeholder="Task type"
                        value={task.type}
                        onChange={(e) => handleTaskChange(index, 'type', e.target.value)}
                        required
                      />
                      <Textarea
                        placeholder="Task description"
                        value={task.description}
                        onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="Points"
                        value={task.points}
                        onChange={(e) => handleTaskChange(index, 'points', parseInt(e.target.value))}
                        min={1}
                        required
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Giveaway'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}