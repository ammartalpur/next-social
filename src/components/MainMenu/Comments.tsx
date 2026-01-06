
import { Comment as CommentFromBackend, addComment as addCommentBackend } from '@/app/actions/UserAction';
import React, { useEffect, useState, useCallback } from 'react';
import CommentList from './CommentList';
import { useUser } from '@clerk/nextjs';


const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<any>([]);
  const { user } = useUser();

  const fetchComments = useCallback(async () => {
    const data = await CommentFromBackend(postId);
    setComments(data);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async (desc: string) => {
    if (!user) return;
    await addCommentBackend(postId, desc, user.id);
    await fetchComments();
  };

  return (
    <div>
      <CommentList comments={comments} postId={postId} onAddComment={handleAddComment} />
    </div>
  );
}

export default Comments