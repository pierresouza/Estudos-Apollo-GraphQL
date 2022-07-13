import React from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_DOG_PHOTO } from "./DogPhoto";

export function DelayedQuery() {
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      {data?.dog && <img src={data.dog.displayImage} />}
      <button onClick={() => getDog({ variables: { breed: "bulldog" } })}>
        Click me!
      </button>
    </div>
  );
}
