'use client'
import { updateProfile } from '@/app/actions/User'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useState } from 'react'

const UpdateUser = ({ user, onUpdate }: { user: UserData; onUpdate?: () => void }) => {
  const [Open, setOpen] = useState(false)
  const [Cover, setCover] = useState<any>(false)
  
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>

      {Open && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center px-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              // @ts-ignore
              await updateProfile(formData, user?.id , Cover?.secure_url);
              setOpen(false);
              // Trigger refresh callback after successful update
              if (onUpdate) {
                onUpdate();
              }
            }}
            className="
            bg-white w-full max-w-3xl
            max-h-[90vh] overflow-y-auto
            rounded-xl shadow-lg
            p-6 md:p-8 relative
          "
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-lg font-semibold">Update Profile</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Use the navbar profile to change avatar and name
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>
            </div>
            <CldUploadWidget uploadPreset='social' onSuccess={value=>setCover(value.info)}>
              {({ open }) => (
                <button
                  type="button"
                  className="flex items-center gap-3 mb-6"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  <span className="text-sm underline cursor-pointer text-gray-600">
                    Change cover
                  </span>
                  <Image
                    src={Cover?.secure_url || user?.cover || "/noCover.png"}
                    alt=""
                    width={64}
                    height={40}
                    className="w-16 h-10 rounded-md object-cover"
                  />
                </button>
              )}
            </CldUploadWidget>
            

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["First Name", user.name, "Name"],
                ["Surname", user.surname, "Surname"],
                ["Description", user.description, "Description"],
                ["City", user.city, "City"],
                ["School", user.school, "School"],
                ["Work", user.work, "Work"],
                ["Website", user.website, "Website"],
              ].map(([label, value, placeholder], i) => (
                <div key={i} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">{label}</label>
                  {placeholder && (
                    <input
                      name={placeholder.toLowerCase()}
                      type="text"
                      placeholder={value || placeholder}
                      className="
                    border border-gray-300
                    rounded-md px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  "
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
              mt-6 w-full
              bg-blue-500 hover:bg-blue-600
              text-white text-sm font-medium
              py-2.5 rounded-md
            "
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


export default UpdateUser