import React from 'react'
import {  useFormStatus } from 'react-dom'

const UpdateButton = () => {
  const {pending} = useFormStatus()

  return (
    <button type='submit'
      className="mt-6 w-full
              bg-blue-500 hover:bg-blue-600
              text-white text-sm font-medium
              py-2.5 rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
}

export default UpdateButton