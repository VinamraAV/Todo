import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { Todos } from "./_components/todos";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main >
      <div>
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getTodos.query();

  return (
    <div style={{ justifyContent: 'space-between', flexDirection: 'column', padding: 20 }}>
      {/* {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost[0]?.todo}</p>
      ) : (
        <p>You have no posts yet.</p>
      )} */}

      <div>
        <CreatePost />
      </div>
      <div>
        <Todos todos={latestPost}></Todos>
      </div>
    </div>
  );
}
