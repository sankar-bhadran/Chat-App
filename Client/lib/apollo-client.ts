import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // Your GraphQL API
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
