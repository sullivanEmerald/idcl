'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar } from '@/components/ui/avatar';
import { campaignSocialService, Comment } from '@/services/campaign-social';

interface CampaignSocialInteractionsProps {
  campaignId: string;
  initialLikes: number;
  initialComments: Comment[];
  onLike: () => Promise<void>;
  onComment: (comment: string) => Promise<void>;
}

export function CampaignSocialInteractions({ 
  campaignId,
  initialLikes = 0,
  initialComments = [],
  onLike,
  onComment 
}: CampaignSocialInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  console.log(comments)

  useEffect(() => {
    const loadSocialData = async () => {
      try {
        const [likesCount, userLiked, commentsData] = await Promise.all([
          campaignSocialService.getLikes(campaignId),
          campaignSocialService.checkUserLike(campaignId),
          campaignSocialService.getComments(campaignId)
        ]);

        setLikes(likesCount);
        setIsLiked(userLiked);
        setComments(commentsData);
      } catch (error) {
        console.error('Error loading social data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load social interactions. Please refresh the page.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSocialData();
  }, [campaignId, toast]);

  const handleLike = async () => {
    try {
      const response = await campaignSocialService.toggleLike(campaignId);
      setIsLiked(response.liked);
      // Refresh likes count after toggling
      const newLikesCount = await campaignSocialService.getLikes(campaignId);
      setLikes(newLikesCount);
      await onLike();
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: 'Error',
        description: 'Failed to update like. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const comment = await campaignSocialService.createComment(campaignId, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
      await onComment(newComment);
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit comment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading social interactions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{comments.length}</span>
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
        />
        <Button
          size="icon"
          onClick={handleSubmitComment}
          disabled={isSubmitting || !newComment.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-2">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src={comment.user.avatar} alt={comment.user.name} /> */}
              {/* <AvatarFallback>
                {comment.user.fullName.charAt(0).toUpperCase()}
              </AvatarFallback> */}
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {/* <span className="font-medium">{comment.user.fullName}</span> */}
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}