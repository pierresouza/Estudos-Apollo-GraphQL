import React from "react";

import { gql, useMutation } from "@apollo/client";
import { ADD_TODO } from "./mock";

interface AddTodoProps {
  dependencies: {
    input: HTMLInputElement | null;
  };
}

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
    }
  }
`;

export function AddTodo({ dependencies: { input } }: AddTodoProps) {
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
