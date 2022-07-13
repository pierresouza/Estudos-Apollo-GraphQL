import { gql, NetworkStatus, useQuery } from "@apollo/client";
export const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;
export function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      pollInterval: 500,
      notifyOnNetworkStatusChange: true,
    }
  );
  if (networkStatus === networkStatus.refetch) return "Refetching!";
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <button onClick={() => refetch({ breed: "new_dog_breed" })}>
        Refetch new breed!
      </button>
      <button
        onClick={() =>
          refetch({
            breed: "dalmatian", // Always refetches a dalmatian instead of original breed
          })
        }
      >
        Refetch!
      </button>
    </>
  );
}
