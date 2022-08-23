import React from "react";
import { AddTodo } from "./components/addtodo";
import { Dogs } from "./Dogs";

export function App() {
  return (
    <>
      <h1>Dogs Querys</h1>
      <AddTodo
        dependencies={{
          input: null,
        }}
      />
    </>
  );
}
