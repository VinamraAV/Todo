import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { v4 as uuidv4 } from "uuid"

export interface ITodo {
  id?: string;
  todo?: string;
  strike?: boolean;
}

let post = {
  id: 1,
  name: "Hello World",
};

let todos: ITodo[] = [] as ITodo;

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),

  createTodo: publicProcedure
    .input(z.object({ todo: z.string().min(1), id: z.string() }))
    .mutation(({ input }) => {
      todos.push({ todo: input.todo, id: input.id });
      console.log(todos)
    }),

  getTodos: publicProcedure
    .query(() => {
      return todos;
    }),
  deleteTodo: publicProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
    let index;
    let foundTodo = todos.find((o, i) => {
      if (o.id === input.id) {
        index = i;
        return true;
      }
    })
    if (index) {
      todos.splice(index, 1)
    }
  })
});
