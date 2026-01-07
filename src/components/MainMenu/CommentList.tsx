import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type commentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
  onAddComment,
}: {
  comments: commentWithUser[];
  postId: number;
  onAddComment: (desc: string) => Promise<void>;
}) => {
  const { user } = useUser();
  const [DescriptionState, setDescriptionState] = useState("");

  // Debug: log incoming comments array whenever it changes
  useEffect(() => {
    console.log("[CommentList] Received comments:", comments);
    if (Array.isArray(comments)) {
      const withoutUser = comments.filter((c) => !c.user);
      if (withoutUser.length) {
        console.warn(
          `[CommentList] ${withoutUser.length} comment(s) missing user relation:`,
          withoutUser.map((c) => ({ id: c.id, userId: c.userId }))
        );
      }
    }
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !DescriptionState) return;
    await onAddComment(DescriptionState);
    setDescriptionState("");
  };

  return (
    <>
      {user && (
        <>
          <div id="write" className="flex items-center gap-4" key={user.id}>
            <Image
              src={user.imageUrl || "/noAvatar.png"}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
            >
              <input
                type="text"
                placeholder="Write a comment ..."
                className="bg-transparent outline-none flex-1"
                value={DescriptionState}
                onChange={(e) => setDescriptionState(e.target.value)}
              />
              <Image
                src={"/emoji.png"}
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </form>
          </div>
          <div id="comments" className="">
            {comments.map((comment) => {
              // Per-comment debug values
              const avatar = comment.user?.avatar || "/noAvatar.png";
              const username = comment.user?.username || "Unknown User";
              if (!comment.user) {
                console.warn("[CommentList] Missing user for comment:", {
                  commentId: comment.id,
                  userId: comment.userId,
                });
              } else {
                if (!comment.user.avatar) {
                  console.debug("[CommentList] User has no avatar, using default:", {
                    commentId: comment.id,
                    userId: comment.userId,
                    username: comment.user.username,
                  });
                }
              }

              return (
                <div
                  id="comment"
                  className="flex gap-4 justify-between mt-6"
                  key={comment.id}
                >
                  <Image
                    src={avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div id="description" className="flex flex-col gap-2 flex-1">
                    <span className="font-medium">{username}</span>
                    <p>{comment.desc}</p>
                    <div className="flex items-center gap-8 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src={"/like.png"}
                          alt=""
                          width={12}
                          height={12}
                          className="cursor-pointer w-3 h-3"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123 Likes</span>
                      </div>
                      <div className="">Reply</div>
                    </div>
                  </div>
                  <Image
                    src={"/more.png"}
                    alt=""
                    width={16}
                    height={16}
                    className="cursor-pointer w-4 h-4"
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default CommentList;
