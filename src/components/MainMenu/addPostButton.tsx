"use client";

import React from "react";
import { useFormState } from "react-dom";

const AddPostButton = () => {
  const action = async (state: any, formData: FormData) => state;
  const initialState = {};
  const [state, formAction, isPending] = useFormState(action, initialState);

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 px-4 py-2 rounded-lg text-white text-sm font-medium transition disabled:cursor-not-allowed"
      disabled={isPending}
    >
      {isPending ? "Sending" : "Send"}
    </button>
  );
};

export default AddPostButton;
