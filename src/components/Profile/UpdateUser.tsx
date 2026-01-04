'use client'
import { updateProfile} from '@/app/actions/User'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import UpdateButton from './UpdateButton'

const UpdateUser = ({ user, onUpdate }: { user: UserData; onUpdate?: () => void }) => {
  const [Open, setOpen] = useState(false)
  const [Cover, setCover] = useState<string>(user?.cover || "")
  
  const handleClose = () => {
    setOpen(false)
     if (onUpdate) {
       onUpdate();
     }
  }

  const [state,formAction]=useActionState(updateProfile,{success:false , error:false})

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
            action={formAction}
            className="
            bg-white w-full max-w-3xl
            max-h-[90vh] overflow-y-auto
            rounded-xl shadow-lg
            p-6 md:p-8 relative
          "
          >
            <input type="hidden" name="userId" value={user?.id} />
            <input type="hidden" name="cover" value={Cover} />
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
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(value) =>
                setCover((value as any).info?.secure_url || "")
              }
            >
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
                    src={Cover || user?.cover || "/noCover.png"}
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
            {state.success && (
              <p className="text-green-500">Profile has been updated!</p>
            )}
            {state.error && (
              <p className="text-red-500 ">Something went wrong!</p>
            )}
            {/* Button */}
            <UpdateButton />
          </form>
        </div>
      )}
    </div>
  );
}


export default UpdateUser