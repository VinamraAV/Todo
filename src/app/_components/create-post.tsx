"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { v4 as uuidv4 } from 'uuid'

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.post.createTodo.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ id: uuidv4(), todo: name });
      }}
      className="flex gap-2"
      style={{ margin: 8 }}
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black bg-slate-300 "
        style={{ height: 40, }}
      />
      <button
        type="submit"
        style={{ height: 40, background: 'cyan', padding: 4, borderRadius: 100 }}
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
