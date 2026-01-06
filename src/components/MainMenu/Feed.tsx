"use client"
import React, { useEffect, useState } from 'react'
import Post from './Post';
import { fetchPost } from '@/app/actions/User';
import { useUser } from '@clerk/nextjs';
import { Post as PrismaPost, User } from "@prisma/client";


type PostType = PrismaPost & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};



const Feed = ({ username, refresh }: { username?: string; refresh?: number }) => {
  const { user, isLoaded } = useUser();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await fetchPost(user?.id, username);
        if (isMounted) setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
      } catch {
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    getPosts();
    return () => { isMounted = false; };
  }, [username, user?.id, refresh]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.length
        ? posts.map((post) => <Post key={post.id} posts={post} />)
        : "No post found"}
    </div>
  );
};

export default Feed