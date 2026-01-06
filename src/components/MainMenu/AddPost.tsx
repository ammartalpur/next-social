"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import AddPostButton from "./addPostButton";
import { addPost } from "@/app/actions/UserAction";


const AddPost = ({ onPostAdded }: { onPostAdded?: () => void }) => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();
  const [submitting, setSubmitting] = useState(false);

  if (!isLoaded) {
    return "Loading...";
  }

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      await addPost(formData, img?.secure_url || "", user?.id || "");
      setDesc("");
      setImg(undefined);
      if (onPostAdded) onPostAdded();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex bg-white p-4 rounded-xl shadow-sm gap-3 max-w-3xl mx-auto">
      <div id="avatar" className="flex-shrink-0">
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      {user && (
        <div id="post" className="flex-1">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
            id="textinput"
            className="flex items-end gap-3 bg-white"
          >
            <textarea
              id="posttest"
              placeholder="What's on your mind?"
              className="flex-1 bg-slate-100 rounded-lg px-3 py-2 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              name="desc"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={submitting}
            ></textarea>

            <Image
              src={"/emoji.png"}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer mb-2"
            />

            <button type="submit" disabled={submitting} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              {submitting ? "Posting..." : "Post"}
            </button>
          </form>

          <div
            id="postoptions"
            className="flex items-center gap-6 mt-4 text-gray-500 text-sm flex-wrap"
          >
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result, { widget }) => {
                setImg(result.info);
                widget.close();
              }}
            >
              {({ open }) => (
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
                  onClick={() => open()}
                >
                  <Image src={"/addimage.png"} alt="" height={18} width={18} />
                  Photo
                </div>
              )}
            </CldUploadWidget>

            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <Image src={"/addimage.png"} alt="" height={18} width={18} />
              Image
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <Image src={"/addVideo.png"} alt="" height={18} width={18} />
              Video
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <Image src={"/addevent.png"} alt="" height={18} width={18} />
              Event
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <Image src={"/poll.png"} alt="" height={18} width={18} />
              Poll
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
