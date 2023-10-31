'use client';

import { useRouter } from "next/navigation";
import { ITodo } from "~/server/api/routers/post";
import { api } from "~/trpc/react";

export function Todos({ todos }: ITodo[]) {
    const router = useRouter();
    const deleteTodo = api.post.deleteTodo.useMutation({
        onSuccess: () => {
            router.refresh();
        }
    })
    return (
        <main>
            {todos?.map((todo) => (<Todo id={todo.id} todo={todo.todo} strike={todo.strike} />))

            }
        </main>
    )
}

function Todo({ todo, id, strike }: ITodo) {
    const router = useRouter();
    const deleteTodo = api.post.deleteTodo.useMutation({
        onSuccess: () => {
            router.refresh();
        }
    })
    return <div style={{ display: 'flex', padding: 8, background: '#F8F8F8', border: '1px solid ', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center' }}
    > <span>{todo}</span> <button onClick={() => { deleteTodo.mutate({ id: id ?? '' }); console.log('clicking') }}><svg class="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg></button></div>
}